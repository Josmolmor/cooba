import { parseInviteUrl } from '@/app/(invites)/join/[id]/actions'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card'
import { fetchPublicEvent } from '@/lib/db/queries/events'
import Logo from '@/components/logo'
import InviteForm from './invite-form'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id
    const decodedEventId = await parseInviteUrl(id)
    const event = await fetchPublicEvent(decodedEventId)

    return {
        title: `${event.creatorName} has invited you to join "${event.title}"`,
        description: `${event.description}`,
    }
}

export default async function JoinPage({ params }: { params: { id: string } }) {
    const decodedEventId = await parseInviteUrl(params.id)

    if (!decodedEventId) return redirect('/events')

    const event = await fetchPublicEvent(decodedEventId)

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold flex justify-between items-center">
                        You're Invited!
                        <div className="bg-border/50 p-2 rounded-full">
                            <Logo />
                        </div>
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-2">
                        {event.creatorName
                            ? `${event.creatorName} has invited you to join "${event.title}"`
                            : `You have been invited to join "${event.title}`}
                        {event.description ? (
                            <p className="text-muted-foreground text-sm italic ml-1">
                                {event.description}
                            </p>
                        ) : null}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <InviteForm eventId={decodedEventId} />
                </CardFooter>
            </Card>
        </div>
    )
}
