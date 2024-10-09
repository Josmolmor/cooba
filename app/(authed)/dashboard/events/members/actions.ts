'use server'

import { db } from '@/lib/db/drizzle'
import { user_events, expenses } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function removeEventMember(eventId: number, userId: number) {
    await db.transaction(async (tx) => {
        // Delete user's expenses for this event
        await tx
            .delete(expenses)
            .where(
                and(
                    eq(expenses.event_id, eventId),
                    eq(expenses.user_id, userId)
                )
            )

        // Remove user from the event
        await tx
            .delete(user_events)
            .where(
                and(
                    eq(user_events.event_id, eventId),
                    eq(user_events.user_id, userId)
                )
            )
    })

    // Revalidate the event page to reflect the changes
    revalidatePath(`/events/${eventId}`)
}
