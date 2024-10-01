'use client'

import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { signIdForInvite } from '@/lib/utils/crypto'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface CopyInvitationLinkToClipboardButtonProps {
    eventId: string
    buttonLabel: string
}

const CopyInvitationLinkToClipboardButton: FC<
    CopyInvitationLinkToClipboardButtonProps
> = ({ eventId, buttonLabel = 'Copy' }) => {
    const [copied, setCopied] = useState(false)
    const pathname = usePathname()

    const handleCopyClick = async () => {
        try {
            const encodedId = await signIdForInvite({ id: eventId })
            console.log('=>', encodedId)
            const inviteLink = `${window.location.host}/join/${encodedId}`
            await navigator.clipboard.writeText(inviteLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // Reset the message after 2 seconds
        } catch (error) {
            console.error('Failed to copy text: ', error)
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={handleCopyClick}
                    className="flex gap-2 sm:w-auto"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {buttonLabel}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Links will be valid for 3 days</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default CopyInvitationLinkToClipboardButton
