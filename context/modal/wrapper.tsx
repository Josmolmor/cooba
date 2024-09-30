'use client'

import React from 'react'
import { useModal } from '@/context/modal/index'
import NewEventModalForm from '@/app/(dashboard)/dashboard/events/new-event-modal'
import ExpenseModalForm from '@/app/(dashboard)/dashboard/expenses/expense-modal'

const ModalWrapper = () => {
    const { isOpen, openModal, modalVariant, closeModal, payload } = useModal()

    if (!isOpen) return null

    switch (modalVariant) {
        case 'new_event':
            return <NewEventModalForm />
        case 'new_expense':
            return <ExpenseModalForm />
        case 'edit_expense':
            return <ExpenseModalForm initialState={payload} />
        default:
            return null
    }
}

export default ModalWrapper
