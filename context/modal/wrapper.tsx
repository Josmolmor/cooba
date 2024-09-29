'use client'

import React from 'react'
import { useModal } from '@/context/modal/index'
import NewEventModalForm from '@/app/(dashboard)/events/new-event-modal'

const ModalWrapper = () => {
    const { isOpen, openModal, modalVariant, closeModal } = useModal()

    if (!isOpen) return null

    let ModalContent

    switch (modalVariant) {
        case 'new_event':
            return <NewEventModalForm />
        default:
            return null
    }

    return { ModalContent }
}

export default ModalWrapper
