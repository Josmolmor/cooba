'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { Event, events, user_events, UserEvent } from '@/lib/db/schema'

const newEventSchema = z.object({
    title: z.string().min(3).max(255),
    date: z.string(),
})

export const addEvent = validatedActionWithUser(
    newEventSchema,
    async (data, _, user) => {
        const { title, date } = data

        try {
            // Create a new event
            const [event]: Event[] = await db
                .insert(events)
                .values({
                    name: title,
                    date: new Date(date),
                })
                .returning()

            await db
                .insert(user_events)
                .values({
                    user_id: user.id,
                    event_id: event.id,
                })
                .returning()

            return {
                success: 'New event added successfully',
                event,
            }
        } catch (error) {
            return { error: `Failed to add new event: ${error}` }
        }
    }
)
