import { db } from '../drizzle'
import { expenses, user_events } from '../schema'
import { and, desc, eq } from 'drizzle-orm'
import { getUser } from '@/lib/db/queries/users'

export async function fetchExpenses(eventId: string) {
    console.log('fetchExpenses =>', eventId)
    const user = await getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }
    return await db
        .select({
            id: expenses.id,
            description: expenses.description,
            amount: expenses.amount,
        })
        .from(expenses)
        .where(
            and(eq(expenses.user_id, user.id), eq(expenses.event_id, eventId))
        )
        .orderBy(desc(expenses.createdAt))
}
