import { fetchEvents } from '@/lib/db/queries/events'
import EmptyState from '@/components/empty-state'
import Link from 'next/link'

export default async function DashboardPage() {
    const events = await fetchEvents()

    return (
        <div className="max-w-7xl mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            {events?.length ? (
                events?.map(({ id, name, date }) => {
                    return (
                        <Link key={id} href={`/dashboard/${id}`}>
                            <strong>{name}</strong>{' '}
                            {new Date(date).toISOString()}
                        </Link>
                    )
                })
            ) : (
                <EmptyState name="event" />
            )}
        </div>
    )
}
