'use server'

import { z } from 'zod'
import { validatedActionWithUser } from '@/lib/auth/middleware'
import { db } from '@/lib/db/drizzle'
import { Expense, expenses } from '@/lib/db/schema'

const newExpenseSchema = z.object({
    description: z.string().min(3).max(255),
    amount: z.string(),
    event_id: z.string(),
})

export const addExpense = validatedActionWithUser(
    newExpenseSchema,
    async (data, _, user) => {
        const { event_id, description, amount } = data

        try {
            // Create a new event
            const [expense]: Expense = await db
                .insert(expenses)
                .values({
                    event_id: event_id,
                    user_id: user.id,
                    description,
                    amount: parseFloat(amount),
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
