'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { Expense, Event } from '@/lib/db/schema'

export type EventPayload = Pick<Event, 'id' | 'title' | 'date'> | null
export type ExpensePayload = Pick<
    Expense,
    'id' | 'description' | 'amount' | 'currency' | 'user_id'
> | null

type ModalVariant = 'new_event' | 'edit_event' | 'new_expense' | 'edit_expense'

type ModalContextType = {
    isOpen: boolean
    modalVariant: ModalVariant
    openModal: (
        variant: ModalVariant,
        eventPayload?: EventPayload,
        expensePayload?: ExpensePayload
    ) => void
    closeModal: () => void
    toggleModal: () => void
    eventPayload: EventPayload
    expensePayload: ExpensePayload
}

const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    modalVariant: 'new_event',
    openModal: () => {},
    closeModal: () => {},
    toggleModal: () => {},
    eventPayload: null,
    expensePayload: null,
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
    const [eventPayload, setEventPayload] = useState<EventPayload>(null)
    const [expensePayload, setExpensePayload] = useState<ExpensePayload>(null)

    const openModal = (
        variant: ModalVariant = 'new_event',
        eventPayload: EventPayload = null,
        expensePayload: ExpensePayload = null
    ) => {
        if (eventPayload) {
            setEventPayload(eventPayload)
        }

        if (expensePayload) {
            setExpensePayload(expensePayload)
        }

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
                eventPayload,
                expensePayload,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
