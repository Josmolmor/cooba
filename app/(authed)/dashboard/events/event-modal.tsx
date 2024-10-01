'use client'

import { useActionState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ActionState } from '@/lib/auth/middleware'
import { addEvent, editEvent } from './actions'
import EventForm from '@/app/(authed)/dashboard/events/event-form'
import { EventPayload, useModal } from '@/context/modal'

export default function EventModalForm({
    initialState = null,
}: {
    initialState: EventPayload
}) {
    console.log('initialState =>', initialState)
    const { isOpen, toggleModal, closeModal } = useModal()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        initialState ? editEvent : addEvent,
        { payload: initialState, error: '' } ?? { error: '' }
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
                        {initialState ? 'Edit' : 'Add new'} event
                    </DialogTitle>
                </DialogHeader>
                <EventForm
                    className="flex flex-col gap-4"
                    formAction={formAction}
                    state={state}
                    pending={pending}
                />
            </DialogContent>
        </Dialog>
    )
}
