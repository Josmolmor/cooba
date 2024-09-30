import { fetchEvent } from '@/lib/db/queries/events'
import { redirect } from 'next/navigation'
import { fetchExpenses } from '@/lib/db/queries/expenses'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EventPage({
    params,
}: {
    params: { id: string }
}) {
    if (!params.id) redirect('/dashboard')

    const event = await fetchEvent(params.id)
    if (!event) redirect('/dashboard')

    const expenses = await fetchExpenses(params.id)

    return (
        <div className="max-w-7xl mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <Link href="/dashboard">
                <ArrowLeft />
            </Link>
            {event ? (
                <>
                    <h1>{event.name}</h1>
                    <p>{new Date(event.date).toISOString()}</p>
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id}>
                                <p>{expense.description}</p>
                                <p>{expense.amount}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    )
}
