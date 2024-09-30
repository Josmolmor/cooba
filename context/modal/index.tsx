'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { Expense } from '@/lib/db/schema'

type ModalVariant = 'new_event' | 'edit_event' | 'new_expense' | 'edit_expense'

type ModalContextType = {
    isOpen: boolean
    modalVariant: ModalVariant
    openModal: (
        variant: ModalVariant,
        payload?: Pick<Expense, 'id' | 'description' | 'amount' | 'currency'>
    ) => void
    closeModal: () => void
    toggleModal: () => void
    payload: Pick<Expense, 'id' | 'description' | 'amount' | 'currency'> | null
}

const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    modalVariant: 'new_event',
    openModal: () => {},
    closeModal: () => {},
    toggleModal: () => {},
    payload: null,
})

export const useModal = (): ModalContextType => {
    let context = useContext(ModalContext)
    if (context === null) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalVariant, setModalVariant] = useState<ModalVariant>('new_event')
    const [payload, setPayload] =
        useState<Pick<Expense, 'id' | 'description' | 'amount' | 'currency'>>(
            null
        )

    const openModal = (variant = 'new_event' as ModalVariant, payload) => {
        setPayload(payload)
        setModalVariant(variant)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                toggleModal,
                modalVariant,
                openModal,
                closeModal,
                payload,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
