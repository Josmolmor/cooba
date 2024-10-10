'use client'

import { useActionState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ActionState } from '@/lib/auth/middleware'
import { ExpensePayload, NewExpensePayload, useModal } from '@/context/modal'
import ExpenseForm from '@/app/(authed)/events/(interactions)/expenses/expense-form'
import { editExpense, addExpense } from '@/lib/db/actions/expenses'

export default function ExpenseModalForm({
    initialState,
}: {
    initialState?: ExpensePayload | NewExpensePayload
}) {
    const { isOpen, toggleModal, closeModal } = useModal()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        (initialState as ExpensePayload)?.id ? editExpense : addExpense,
        initialState ? { payload: initialState, error: '' } : { error: '' }
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
                    <DialogTitle>
                        {initialState ? 'Edit' : 'Add new'} expense
                    </DialogTitle>
                </DialogHeader>
                <ExpenseForm
                    className="flex flex-col gap-4"
                    formAction={formAction}
                    state={state}
                    pending={pending}
                />
            </DialogContent>
        </Dialog>
    )
}
