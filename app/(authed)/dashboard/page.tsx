import { fetchEvents } from '@/lib/db/queries/events'
import EmptyState from '@/components/empty-state'
import { EventCard } from './event-card'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NewEventButton from './new-event-button'

// Prices are fresh for one hour max
export const revalidate = 3600

export default async function DashboardPage() {
    const events = await fetchEvents()

    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-lg lg:text-2xl font-medium bold text-foreground/90">
                    Events list
                </h1>
                <NewEventButton />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events?.length ? (
                    events?.map(({ id, title, date, ownerId, creatorName }) => (
                        <EventCard
                            key={id}
                            id={id}
                            title={title}
                            date={date}
                            ownerId={ownerId}
                            creatorName={creatorName}
                        />
                    ))
                ) : (
                    <EmptyState name="event" />
                )}
            </div>
        </div>
    )
}
