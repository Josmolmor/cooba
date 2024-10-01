'use client'

import React from 'react'
import { useModal } from '@/context/modal/index'
import ExpenseModalForm from '@/app/(authed)/dashboard/expenses/expense-modal'
import EventModalForm from '@/app/(authed)/dashboard/events/event-modal'

const ModalWrapper = () => {
    const {
        isOpen,
        openModal,
        modalVariant,
        closeModal,
        eventPayload,
        expensePayload,
    } = useModal()

    if (!isOpen) return null

    switch (modalVariant) {
        case 'new_event':
            return <EventModalForm />
        case 'edit_event':
            return <EventModalForm initialState={eventPayload} />
        case 'new_expense':
            return <ExpenseModalForm />
        case 'edit_expense':
            return <ExpenseModalForm initialState={expensePayload} />
        default:
            return null
    }
}

export default ModalWrapper
