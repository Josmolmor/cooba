'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { Expense, expenses, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const newExpenseSchema = z.object({
    description: z.string().min(3).max(255),
    amount: z.string(),
    currency: z.string(),
    event_id: z.string(),
    user_id: z.string(),
})

export const addExpense = validatedActionWithUser(
    newExpenseSchema,
    async (data, _, user) => {
        const { event_id, description, currency, amount, user_id } = data

        try {
            // Create a new event
            const [expense]: Expense[] = await db
                .insert(expenses)
                .values({
                    event_id: +event_id,
                    user_id: +user_id ?? user.id,
                    description,
                    currency,
                    amount: parseFloat(amount).toString(),
                })
                .returning()

            return {
                success: 'New expense added successfully',
                expense,
            }
        } catch (error) {
            return { error: `Failed to add new expense: ${error}` }
        }
    }
)

const editExpenseSchema = z.object({
    id: z.string(),
    description: z.string().min(3).max(255),
    amount: z.string(),
    currency: z.string(),
    event_id: z.string(),
    user_id: z.string(),
})

export const editExpense = validatedActionWithUser(
    editExpenseSchema,
    async (data, _, user) => {
        const { id, description, currency, amount, user_id } = data

        try {
            // Create a new event
            const [expense]: Expense[] = await db
                .update(expenses)
                .set({
                    user_id: +user_id ?? user.id,
                    description,
                    currency,
                    amount: parseFloat(amount).toString(),
                })
                .where(eq(expenses.id, +id))
                .returning()

            return {
                success: 'Expense edited successfully',
                expense,
            }
        } catch (error) {
            return { error: `Failed to edit expense: ${error}` }
        }
    }
)
