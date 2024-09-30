'use client'

import { useActionState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ActionState } from '@/lib/auth/middleware'
import { useModal } from '@/context/modal'
import NewExpenseForm from '@/app/(dashboard)/dashboard/expenses/new-expense-form'
import { addExpense } from './actions'

export default function NewExpenseModalForm() {
    const { isOpen, toggleModal, closeModal } = useModal()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        addExpense,
        { error: '' }
    )

    useEffect(() => {
        if (state?.success) {
            closeModal()
        }
    }, [state])

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-4">
                    <DialogTitle>Add new expense</DialogTitle>
                </DialogHeader>
                <NewExpenseForm
                    className="flex flex-col gap-4"
                    formAction={formAction}
                    state={state}
                    pending={pending}
                />
            </DialogContent>
        </Dialog>
    )
}
