'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { Event, events, Expense, user_events } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'

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
                    title,
                    date: new Date(date),
                    owner_id: user.id,
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

const editEventSchema = z.object({
    id: z.string(),
    title: z.string().min(3).max(255),
    date: z.string(),
})

export const editEvent = validatedActionWithUser(
    editEventSchema,
    async (data, _, user) => {
        const { id, title, date } = data

        try {
            // Create a new event
            const expense: Expense = await db
                .update(events)
                .set({
                    title,
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
        const expense: Expense = await db
            .update(events)
            .set({
                deletedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(events.id, event_id))
            .returning()

        return {
            success: 'Event disabled successfully',
            expense,
        }
    } catch (error) {
        return { error: `Failed to disable event: ${error}` }
    }
}
