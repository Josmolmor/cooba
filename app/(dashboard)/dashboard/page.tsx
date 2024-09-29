import { fetchEvents } from '@/lib/db/queries/events'
import EmptyState from '@/components/empty-state'

export default async function DashboardPage() {
    const events = await fetchEvents()
    console.log(events)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {events?.length ? (
                events?.map((event) => {
                    return (
                        <div key={event.id}>
                            <h1>{event.name}</h1>
                            <p>{new Date(event.date).toISOString()}</p>
                        </div>
                    )
                })
            ) : (
                <EmptyState name="event" />
            )}
        </div>
    )
}
