import { fetchEvent } from '@/lib/db/queries/events'
import { redirect } from 'next/navigation'
import { fetchExpenses } from '@/lib/db/queries/expenses'
import Expense from '@/app/(authed)/dashboard/[id]/expense'
import EmptyState from '@/components/empty-state'
import EventHeadline from '@/app/(authed)/dashboard/[id]/event-headline'

export default async function EventPage({
    params,
}: {
    params: { id: string }
}) {
    if (!params.id) redirect('/dashboard')

    const event = await fetchEvent(params.id)
    if (!event) redirect('/dashboard')

    const expenses = await fetchExpenses(params.id)

    const totalsByCurrency = expenses.reduce((acc, expense) => {
        const { amount, currency } = expense

        // Convert the amount to a number before adding
        const amountNumber = parseFloat(amount)

        // Initialize currency total if not present
        if (!acc[currency]) {
            acc[currency] = 0
        }

        // Add the current amount
        acc[currency] += amountNumber

        return acc
    }, {})

    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <EventHeadline
                id={params.id}
                title={event.title}
                date={event.date}
                totalsByCurrency={totalsByCurrency}
            />

            <h2 className="text-2xl font-semibold">Expenses</h2>
            <div
                className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
            >
                {expenses.length ? (
                    expenses.map(({ id, description, amount, currency }) => (
                        <Expense
                            key={id}
                            id={id}
                            description={description}
                            amount={amount}
                            currency={currency}
                        />
                    ))
                ) : (
                    <EmptyState className="col-span-full" name={'expense'} />
                )}
            </div>
        </div>
    )
}
