import { db } from '../drizzle'
import { Expense, expenses, user_events, users } from '../schema'
import { and, count, desc, eq, sql, sum } from 'drizzle-orm'
import { getUser } from './users'
import { unstable_cache } from 'next/cache'

export type FetchExpense = {
    id: Expense['id']
    description: Expense['description']
    currency: Expense['currency']
    amount: Expense['amount']
    eventId: Expense['eventId']
    userId: Expense['userId']
}

export async function fetchExpenses(
    eventId: string
): Promise<FetchExpense[] | []> {
    return await db
        .select({
            id: expenses.id,
            description: expenses.description,
            currency: expenses.currency,
            amount: expenses.amount,
            eventId: expenses.eventId,
            userId: expenses.userId,
        })
        .from(expenses)
        .where(eq(expenses.eventId, +eventId))
        .orderBy(desc(expenses.createdAt))
}

export const getEventExpenses = unstable_cache(
    async (eventId: number) => {
        const expensesQuery = db
            .select({
                id: expenses.id,
                amount: expenses.amount,
                currency: expenses.currency,
                userId: expenses.userId,
                description: expenses.description,
                createdAt: expenses.createdAt,
            })
            .from(expenses)
            .where(sql`${expenses.eventId} = ${eventId}`)

        const participantCountQuery = db
            .select({
                count: sql`count(distinct ${user_events.userId})`.as(
                    'participant_count'
                ),
            })
            .from(user_events)
            .where(sql`${user_events.eventId} = ${eventId}`)

        const participantsQuery = db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .from(users)
            .innerJoin(user_events, sql`${users.id} = ${user_events.userId}`)
            .where(sql`${user_events.eventId} = ${eventId}`)

        const [expensesResult, participantCountResult, participantsResult] =
            await Promise.all([
                expensesQuery,
                participantCountQuery,
                participantsQuery,
            ])

        const expensesRes = expensesResult
        const participantCount = participantCountResult[0].count
        const participants = participantsResult

        // Group expenses by currency
        const expensesByCurrency = expensesRes.reduce(
            (acc, expense) => {
                if (!acc[expense.currency]) {
                    acc[expense.currency] = []
                }
                acc[expense.currency].push(expense)
                return acc
            },
            {} as Record<string, typeof expensesRes>
        )

        // Calculate totals and balances per currency
        const currencyTotals = Object.entries(expensesByCurrency).map(
            ([currency, expenseList]) => ({
                currency,
                total: expenseList.reduce(
                    (sum, e) => sum + parseFloat(e.amount),
                    0
                ),
                participantCount,
            })
        )

        // Calculate user balances per currency
        const userBalances = participants.map((user) => {
            const balances = currencyTotals.map(
                ({ currency, total, participantCount }) => {
                    const userExpenses =
                        expensesByCurrency[currency]?.filter(
                            (e) => e.userId === user.id
                        ) || []
                    const userPaid = userExpenses.reduce(
                        (sum, e) => sum + parseFloat(e.amount),
                        0
                    )
                    const shouldPay = total / Number(participantCount)
                    return { currency, balance: userPaid - shouldPay }
                }
            )
            return { ...user, balances }
        })

        return {
            expenses: expensesRes,
            currencyTotals,
            userBalances,
        }
    },
    ['eventExpenses'],
    { revalidate: 7200, tags: ['eventExpenses'] }
)
