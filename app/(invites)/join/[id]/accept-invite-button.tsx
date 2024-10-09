'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { acceptInvite } from './actions'

export function AcceptInviteButton({
    decodedEventId,
}: {
    decodedEventId: string
}) {
    return (
        <Button
            onClick={() => acceptInvite(decodedEventId)}
            aria-label="Accept invitation"
        >
            <CheckCircle className="mr-2 h-4 w-4" /> Accept invitation
        </Button>
    )
}
