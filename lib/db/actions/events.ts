'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { Event, events, Expense, user_events } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const newEventSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(255).nullable(),
    date: z.string(),
})

export const addEvent = validatedActionWithUser(
    newEventSchema,
    async (data, _, user) => {
        const { title, description, date } = data

        try {
            // Create a new event
            const [event]: Event[] = await db
                .insert(events)
                .values({
                    title,
                    description,
                    date: new Date(date),
                    ownerId: user.id,
                })
                .returning()

            await db
                .insert(user_events)
                .values({
                    userId: user.id,
                    eventId: event.id,
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

const editEventSchema = z.object({
    id: z.string(),
    title: z.string().min(3).max(255),
    description: z.string().max(255).nullable(),
    date: z.string(),
})

export const editEvent = validatedActionWithUser(
    editEventSchema,
    async (data, _, user) => {
        const { id, title, description, date } = data

        try {
            // Create a new event
            const expense: Expense = await db
                .update(events)
                .set({
                    title,
                    description,
                    date: new Date(date),
                })
                .where(eq(events.id, +id))
                .returning()

            return {
                success: 'Event edited successfully',
                expense,
            }
        } catch (error) {
            return { error: `Failed to edit event: ${error}` }
        }
    }
)

export const disableEvent = async (event_id: number) => {
    try {
        // Create a new event
        const event: Event = await db
            .update(events)
            .set({
                deletedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(events.id, event_id))
            .returning()

        revalidatePath('/events')
        return {
            success: 'Event disabled successfully',
            event,
        }
    } catch (error) {
        return { error: `Failed to disable event: ${error}` }
    }
}
