'use client'

import React from 'react'
import { useModal } from '@/context/modal/index'
import NewEventModalForm from '@/app/(dashboard)/dashboard/events/new-event-modal'
import NewExpenseModalForm from '@/app/(dashboard)/dashboard/expenses/new-expense-modal'

const ModalWrapper = () => {
    const { isOpen, openModal, modalVariant, closeModal } = useModal()

    if (!isOpen) return null

    let ModalContent

    switch (modalVariant) {
        case 'new_event':
            return <NewEventModalForm />
        case 'new_expense':
            return <NewExpenseModalForm />
        default:
            return null
    }

    return { ModalContent }
}

export default ModalWrapper
