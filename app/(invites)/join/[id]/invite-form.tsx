'use client'

import { Button } from '@/components/ui/button'
import { ActionState } from '@/lib/auth/middleware'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { useActionState } from 'react'
import { acceptInvite } from './actions'
import Link from 'next/link'

export default function InviteForm({ eventId }: { eventId: string }) {
    const [inviteState, inviteAction, isInvitePending] = useActionState<
        ActionState,
        FormData
    >(acceptInvite, { error: '', success: '' })

    return (
        <form
            action={inviteAction}
            className="flex items-center flex-wrap gap-4 justify-end w-full"
        >
            <input
                id="event_id"
                name="event_id"
                type="hidden"
                defaultValue={eventId}
            />
            <Button
                type="submit"
                aria-label="Accept invitation"
                disabled={isInvitePending}
            >
                {isInvitePending ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Loading...
                    </>
                ) : (
                    <>
                        <CheckCircle className="mr-2 h-4 w-4" /> Accept
                        invitation
                    </>
                )}
            </Button>
            <Button
                type="button"
                asChild
                variant="secondary"
                aria-label="Reject invitation"
                disabled={isInvitePending}
            >
                <Link
                    href="/events"
                    className={`flex items-center gap-1 w-full sm:w-auto ${isInvitePending ? 'pointer-events-none' : ''} ${isInvitePending ? 'cursor-not-allowed' : ''}`}
                >
                    <XCircle className="mr-2 h-4 w-4" /> Reject invitation
                </Link>
            </Button>
        </form>
    )
}
