'use server'

import { db } from '@/lib/db/drizzle'
import { user_events, expenses } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function removeEventMember(eventId: number, userId: number) {
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

    // Revalidate the event page to reflect the changes
    revalidatePath(`/events`)
    redirect('/events')
}
