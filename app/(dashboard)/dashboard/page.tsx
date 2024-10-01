import { fetchEvents } from '@/lib/db/queries/events'
import EmptyState from '@/components/empty-state'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CalendarDays, ChevronRight, UserPlus, UserPlus2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
    const events = await fetchEvents()

    return (
        <div className="max-w-7xl w-full mx-auto py-6 px-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Events list</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events?.length ? (
                    events?.map(({ id, name, date }) => (
                        <Card key={id}>
                            <CardHeader className="pb-4">
                                <CardTitle>{name}</CardTitle>
                                <CardDescription>
                                    <span className="flex items-center">
                                        <CalendarDays className="mr-2 h-4 w-4" />
                                        {new Date(date).toLocaleDateString()}
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex gap-4 flex-wrap">
                                <Button className="sm:w-auto">
                                    Copy invite link
                                    <UserPlus2 className="ml-2" size={14} />
                                </Button>
                                <Link
                                    href={`/dashboard/${id}`}
                                    key={id}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 self-start w-full sm:w-auto"
                                >
                                    View Details
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <EmptyState name="event" />
                )}
            </div>
        </div>
    )
}
