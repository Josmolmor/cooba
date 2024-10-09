'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/context/modal'
import { Plus } from 'lucide-react'

export default function NewExpenseButton() {
    const { openModal } = useModal()

    return (
        <Button onClick={() => openModal('new_expense')} className="w-auto">
            <>
                <Plus className="-ml-1 mr-2 h-4 w-4" />
                Add expense
            </>
        </Button>
    )
}
