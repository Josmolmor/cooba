import { fetchEvent } from '@/lib/db/queries/events'
import { redirect } from 'next/navigation'
import { FetchExpense, fetchExpenses } from '@/lib/db/queries/expenses'
import EmptyState from '@/components/empty-state'
import EventHeadline from '@/app/(authed)/events/[id]/event-headline'
import { getAllUsersEventsByEventId } from '@/lib/db/queries/users'
import ExpenseCard from '@/app/(authed)/events/[id]/expense-card'
import NewExpenseButton from './new-expense-button'

// const totalsByCurrency = (expenses: FetchExpense[]): Totals => {
//     const totals = expenses.reduce<Totals>((acc, expense) => {
//         const { amount, currency } = expense
//         const amountNumber = parseFloat(amount)

//         if (!acc[currency]) {
//             acc[currency] = 0
//         }

//         acc[currency] += amountNumber
//         return acc
//     }, {})

//     // Convert the totals object to an array and sort it
//     const sortedTotals = Object.entries(totals).sort(([, a], [, b]) => b - a) // Sort in descending order based on amounts

//     // Optional: If you need the sorted totals back in object format
//     return Object.fromEntries(sortedTotals) as Totals
// }

const totalsByCurrency = (expenses: FetchExpense[]) => {
    const totalsWithoutDeleted = expenses.reduce<{ [key: string]: number }>(
        (acc, expense) => {
            const { amount, currency, deletedAt } = expense
            const amountNumber = parseFloat(amount)

            if (!deletedAt) {
                // Only include expenses without deletedAt
                if (!acc[currency]) {
                    acc[currency] = 0
                }
                acc[currency] += amountNumber
            }
            return acc
        },
        {}
    )

    const totalsWithDeleted = expenses.reduce<{ [key: string]: number }>(
        (acc, expense) => {
            const { amount, currency } = expense
            const amountNumber = parseFloat(amount)

            if (!acc[currency]) {
                acc[currency] = 0
            }

            acc[currency] += amountNumber
            return acc
        },
        {}
    )

    // Convert the totals objects to arrays and sort them
    const sortedTotalsWithoutDeleted = Object.entries(
        totalsWithoutDeleted
    ).sort(([, a], [, b]) => b - a)
    const sortedTotalsWithDeleted = Object.entries(totalsWithDeleted).sort(
        ([, a], [, b]) => b - a
    )

    // Optional: If you need the sorted totals back in object format
    return {
        totalsWithoutDeleted: Object.fromEntries(
            sortedTotalsWithoutDeleted
        ) as { [key: string]: number },
        totalsWithDeleted: Object.fromEntries(sortedTotalsWithDeleted) as {
            [key: string]: number
        },
    }
}

export default async function EventPage({
    params,
}: {
    params: { id: string }
}) {
    if (!params.id) redirect('/events')

    const event = await fetchEvent(params.id)
    if (!event) redirect('/events')

    const [expenses, usersList] = await Promise.allSettled([
        fetchExpenses(params.id),
        getAllUsersEventsByEventId(params.id),
    ])

    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <EventHeadline
                id={+params.id}
                title={event.title}
                description={event.description}
                date={event.date}
                ownerName={event.creatorName ?? ''}
                ownerId={event.ownerId}
                totals={totalsByCurrency(
                    expenses.status === 'fulfilled' ? expenses.value : []
                )}
                eventMembers={
                    usersList.status === 'fulfilled'
                        ? usersList.value.filter((u) => !u.deletedAt)
                        : []
                }
            />

            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-semibold">Expenses</h2>
                {usersList.status === 'fulfilled' ? (
                    <NewExpenseButton members={usersList.value} />
                ) : null}
            </div>
            <div
                className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
            >
                {expenses.status === 'fulfilled' &&
                usersList.status === 'fulfilled' &&
                expenses.value.length ? (
                    expenses.value.map(
                        (
                            {
                                id,
                                description,
                                amount,
                                currency,
                                userId,
                                deletedAt,
                            },
                            index
                        ) => (
                            <ExpenseCard
                                key={id}
                                index={index}
                                id={id}
                                description={description}
                                amount={amount}
                                currency={currency}
                                userId={userId}
                                userName={
                                    usersList.value.find(
                                        (user) => user.userId === userId
                                    )?.userName ?? ''
                                }
                                deletedAt={deletedAt}
                                members={usersList.value}
                            />
                        )
                    )
                ) : (
                    <EmptyState
                        className="col-span-full"
                        name={'expense'}
                        members={
                            usersList.status === 'fulfilled'
                                ? usersList.value
                                : []
                        }
                    />
                )}
            </div>
        </div>
    )
}
