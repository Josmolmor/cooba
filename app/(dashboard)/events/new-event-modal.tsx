'use client'

import { useActionState, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ActionState } from '@/lib/auth/middleware'
import { addEvent } from './actions'
import NewEventForm from '@/app/(dashboard)/events/new-event-form'
import { useModal } from '@/context/modal'

export default function NewEventModalForm() {
    const { isOpen, toggleModal, closeModal } = useModal()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        addEvent,
        { error: '' }
    )

    useEffect(() => {
        console.log('=>', state)
        if (state?.success) {
            closeModal()
        }
    }, [state])

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-4">
                    <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <NewEventForm
                    className="flex flex-col gap-4"
                    formAction={formAction}
                    state={state}
                    pending={pending}
                />
            </DialogContent>
        </Dialog>
    )
}
