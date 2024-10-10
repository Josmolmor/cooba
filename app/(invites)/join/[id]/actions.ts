'use server'

import { verifyInviteId } from '@/lib/utils/crypto'
import { getUser } from '@/lib/db/queries/users'
import { db } from '@/lib/db/drizzle'
import { expenses, user_events } from '@/lib/db/schema'
import { and, eq, isNull } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { validatedAction } from '@/lib/auth/middleware'
import { z } from 'zod'
import { getAllEventUsers } from '@/lib/db/queries/user_events'

export async function parseInviteUrl(encodedEventId: string) {
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }

    const payload = await verifyInviteId(encodedEventId)
    if (!payload?.id) return redirect('/events')

    const decodedEventId = payload.id

    const userEvents = await db
        .select({
            id: user_events.id,
        })
        .from(user_events)
        .where(
            and(
                eq(user_events.eventId, +decodedEventId),
                eq(user_events.userId, user.id),
                isNull(user_events.deletedAt)
            )
        )

    // User doesn't belong to the event so create the relationship
    if (userEvents.length > 0) return redirect(`/events/`)

    return decodedEventId
}

const acceptInviteSchema = z.object({
    event_id: z.string(),
})

export const acceptInvite = validatedAction(
    acceptInviteSchema,
    async (data, formData) => {
        const user = await getUser()
        if (!user) {
            throw new Error('User not authenticated')
        }

        const { event_id } = data

        const eventUsers = await getAllEventUsers(event_id)

        // no existing user-event relationship
        if (!eventUsers.length) {
            await db.insert(user_events).values({
                userId: user.id,
                eventId: +event_id,
            })
            return redirect(`/events/${event_id}`)
        }

        // user was already on the event and got removed
        // Restore user_events entry for the user/event and the expenses associated
        await db.transaction(async (tx) => {
            await tx
                .update(user_events)
                .set({
                    deletedAt: null,
                })
                .where(
                    and(
                        eq(user_events.eventId, +event_id),
                        eq(user_events.userId, user.id)
                    )
                )

            await tx
                .update(expenses)
                .set({
                    deletedAt: null,
                })
                .where(
                    and(
                        eq(expenses.eventId, +event_id),
                        eq(expenses.userId, user.id)
                    )
                )
        })

        redirect(`/events/${event_id}`)
    }
)
