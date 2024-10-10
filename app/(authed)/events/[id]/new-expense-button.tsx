'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/context/modal'
import { EventMembers } from '@/lib/db/queries/users'
import { Plus } from 'lucide-react'

export default function NewExpenseButton({
    members,
}: {
    members: EventMembers[]
}) {
    const { openModal } = useModal()

    return (
        <Button
            onClick={() =>
                openModal('new_expense', undefined, undefined, undefined, {
                    members,
                })
            }
            className="w-auto"
        >
            <>
                <Plus className="-ml-1 mr-2 h-4 w-4" />
                Add expense
            </>
        </Button>
    )
}
