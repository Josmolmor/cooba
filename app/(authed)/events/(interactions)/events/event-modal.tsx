'use client'

import { useActionState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ActionState } from '@/lib/auth/middleware'
import EventForm from '@/app/(authed)/events/(interactions)/events/event-form'
import { EventPayload, useModal } from '@/context/modal'
import { editEvent, addEvent } from '@/lib/db/actions/events'
import { redirect } from 'next/navigation'

export default function EventModalForm({
    initialState,
}: {
    initialState?: EventPayload
}) {
    const { isOpen, toggleModal, closeModal } = useModal()
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        initialState ? editEvent : addEvent,
        { payload: initialState, error: '' } ?? { error: '' }
    )

    useEffect(() => {
        if (state?.success) {
            closeModal()
            redirect(`/events/${state.event.id}`)
        }
    }, [state])

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
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
