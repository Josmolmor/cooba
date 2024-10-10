'use client'

import React from 'react'
import { useModal } from '@/context/modal/index'
import ExpenseModalForm from '@/app/(authed)/events/(interactions)/expenses/expense-modal'
import EventModalForm from '@/app/(authed)/events/(interactions)/events/event-modal'
import EventMembersModal from '@/app/(authed)/events/(interactions)/events/members/event-members-modal'

const ModalWrapper = () => {
    const {
        isOpen,
        modalVariant,
        eventPayload,
        expensePayload,
        eventMembersPayload,
        newExpensePayload,
    } = useModal()

    if (!isOpen) return null

    switch (modalVariant) {
        case 'new_event':
            return <EventModalForm />
        case 'edit_event':
            return <EventModalForm initialState={eventPayload} />
        case 'new_expense':
            return <ExpenseModalForm initialState={newExpensePayload} />
        case 'edit_expense':
            return <ExpenseModalForm initialState={expensePayload} />
        case 'view_event_members':
            return (
                <EventMembersModal
                    ownerId={eventMembersPayload?.ownerId}
                    initialMembers={eventMembersPayload?.initialMembers ?? []}
                />
            )
        default:
            return null
    }
}

export default ModalWrapper
