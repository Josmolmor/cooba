import { db } from '../drizzle'
import { Expense, expenses } from '../schema'
import { desc, eq } from 'drizzle-orm'

export async function fetchExpenses(eventId: string): Promise<
    | {
          id: Expense['id']
          description: Expense['description']
          currency: Expense['currency']
          amount: Expense['amount']
          eventId: Expense['event_id']
          userId: Expense['user_id']
      }[]
    | []
> {
    return await db
        .select({
            id: expenses.id,
            description: expenses.description,
            currency: expenses.currency,
            amount: expenses.amount,
            eventId: expenses.event_id,
            userId: expenses.user_id,
        })
        .from(expenses)
        .where(eq(expenses.event_id, +eventId))
        .orderBy(desc(expenses.createdAt))
}
