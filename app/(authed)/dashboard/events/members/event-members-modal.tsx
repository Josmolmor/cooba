'use client'

import { useModal } from '@/context/modal'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { removeEventMember } from './actions'
import { EventMembers } from '@/lib/db/queries/users'
import { useUser } from '@/lib/auth'

interface EventMembersModalProps {
    ownerId?: number | null
    initialMembers: EventMembers[]
}

export default function EventMembersModal({
    ownerId,
    initialMembers,
}: EventMembersModalProps) {
    const { user } = useUser()
    const { isOpen, closeModal } = useModal()
    const [isPending, startTransition] = useTransition()
    const [members, setMembers] = useState(initialMembers)

    const handleRemoveMember = (eventId: number, memberId: number) => {
        startTransition(async () => {
            try {
                await removeEventMember(eventId, memberId)
                setMembers(
                    members.filter((member) => member.userId !== memberId)
                )
            } catch (error) {
                console.error('Failed to remove member:', error)
                // Handle error (e.g., show an error message to the user)
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Event Members</DialogTitle>
                </DialogHeader>
                <ul className="flex flex-col gap-2">
                    {members.map((member) => (
                        <li
                            key={member.userId}
                            className="flex justify-between items-center"
                        >
                            <span>
                                {member.userName} ({member.userEmail})
                            </span>
                            {(ownerId === user?.id ||
                                ownerId !== member.userId) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        handleRemoveMember(
                                            member.eventId,
                                            member.userId
                                        )
                                    }
                                    disabled={isPending}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}
