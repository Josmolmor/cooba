import { fetchEvent } from '@/lib/db/queries/events'
import { redirect } from 'next/navigation'
import { fetchExpenses } from '@/lib/db/queries/expenses'
import EmptyState from '@/components/empty-state'
import EventHeadline from '@/app/(authed)/dashboard/[id]/event-headline'
import {
    getAllUsersEventsByEventId,
    getUser,
    getUserById,
} from '@/lib/db/queries/users'
import ExpenseCard from '@/app/(authed)/dashboard/[id]/expense'
import { Expense } from '@/lib/db/schema'

type Totals = {
    [key: string]: number // Key is the currency, value is the total amount
}

const totalsByCurrency = (expenses: Expense[]): Totals => {
    const totals = expenses.reduce<Totals>((acc, expense) => {
        const { amount, currency } = expense
        const amountNumber = parseFloat(amount)

        if (!acc[currency]) {
            acc[currency] = 0
        }

        acc[currency] += amountNumber
        return acc
    }, {})

    // Convert the totals object to an array and sort it
    const sortedTotals = Object.entries(totals).sort(([, a], [, b]) => b - a) // Sort in descending order based on amounts

    // Optional: If you need the sorted totals back in object format
    return Object.fromEntries(sortedTotals) as Totals
}

export default async function EventPage({
    params,
}: {
    params: { id: string }
}) {
    const user = await getUser()
    if (!params.id) redirect('/dashboard')

    const event = await fetchEvent(params.id)
    if (!event) redirect('/dashboard')

    const expenses = await fetchExpenses(params.id)
    const usersList = await getAllUsersEventsByEventId(params.id)

    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <EventHeadline
                id={params.id}
                title={event.title}
                date={event.date}
                totalsByCurrency={totalsByCurrency(expenses)}
            />

            <h2 className="text-2xl font-semibold">Expenses</h2>
            <div
                className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
            >
                {expenses.length ? (
                    expenses.map(
                        (
                            { id, description, amount, currency, userId },
                            index
                        ) => (
                            <ExpenseCard
                                key={id}
                                index={index}
                                id={id}
                                description={description}
                                amount={amount}
                                currency={currency}
                                userName={
                                    usersList?.find(
                                        (user) => user.userId === userId
                                    )?.userName
                                }
                            />
                        )
                    )
                ) : (
                    <EmptyState className="col-span-full" name={'expense'} />
                )}
            </div>
        </div>
    )
}
