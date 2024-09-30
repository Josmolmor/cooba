import { fetchEvent } from '@/lib/db/queries/events'
import { redirect } from 'next/navigation'
import { fetchExpenses } from '@/lib/db/queries/expenses'
import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import Expense from '@/app/(dashboard)/dashboard/[id]/expense'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import EmptyState from '@/components/empty-state'
import { isObjectEmpty } from '@/lib/utils'

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
            <Link
                href="/dashboard"
                className="inline-flex items-center justify-center self-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
            </Link>

            <Card className="mb-4 bg-primary text-primary-foreground">
                <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-8">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-2xl">
                                {event.name}
                            </CardTitle>
                            <div className="text-primary-foreground/80 text-sm flex items-center">
                                <CalendarDays className="mr-1 h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:text-right">
                            <div className="text-sm">Total Expenses</div>
                            <div className="text-2xl font-bold">
                                {isObjectEmpty(totalsByCurrency)
                                    ? 0
                                    : Object.entries(totalsByCurrency)
                                          .map(([currency, total]) => {
                                              return `${(+total).toFixed(2)} ${currency}`
                                          })
                                          .join(' + ')}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

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
