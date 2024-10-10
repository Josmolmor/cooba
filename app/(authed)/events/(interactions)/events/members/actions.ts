'use server'

import { db } from '@/lib/db/drizzle'
import { getUser } from '@/lib/db/queries/users'
import { user_events, expenses } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function removeEventMember(eventId: number, userId: number) {
    const user = await getUser()
    await db.transaction(async (tx) => {
        await tx
            .update(user_events)
            .set({
                deletedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(
                    eq(user_events.eventId, eventId),
                    eq(user_events.userId, userId)
                )
            )

        await tx

            .update(expenses)
            .set({
                deletedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(eq(expenses.eventId, eventId), eq(expenses.userId, userId))
            )
    })

    if (user?.id !== userId) {
        revalidatePath(`/events`)
        return redirect('/events')
    }

    // Revalidate the event page to reflect the changes
    revalidatePath(`/events/${eventId}`)
}
