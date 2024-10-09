'use server'

import { verifyInviteId } from '@/lib/utils/crypto'
import { getUser } from '@/lib/db/queries/users'
import { db } from '@/lib/db/drizzle'
import { user_events } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { validatedAction } from '@/lib/auth/middleware'
import { z } from 'zod'

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
                eq(user_events.event_id, +decodedEventId),
                eq(user_events.user_id, user.id)
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

        await db.insert(user_events).values({
            user_id: user.id,
            event_id,
        })

        redirect(`/events/${event_id}`)
    }
)
