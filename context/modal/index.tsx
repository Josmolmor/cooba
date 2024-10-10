'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { Expense, Event, User } from '@/lib/db/schema'
import { EventMembers } from '@/lib/db/queries/users'

export type EventPayload = Pick<
    Event,
    'id' | 'title' | 'date' | 'ownerId'
> | null

export type NewExpensePayload = { members: EventMembers[] }

export type ExpensePayload =
    | (Pick<
          Expense,
          'id' | 'description' | 'amount' | 'currency' | 'userId'
      > & { members: EventMembers[] })
    | null

export type EventMembersPayload = {
    ownerId: Event['ownerId']
    initialMembers: EventMembers[]
} | null

type ModalVariant =
    | 'new_event'
    | 'edit_event'
    | 'new_expense'
    | 'edit_expense'
    | 'view_event_members'

type ModalContextType = {
    isOpen: boolean
    modalVariant: ModalVariant
    openModal: (
        variant: ModalVariant,
        eventPayload?: EventPayload,
        expensePayload?: ExpensePayload,
        eventMembersPayload?: EventMembersPayload,
        newExpensePayload?: NewExpensePayload
    ) => void
    closeModal: () => void
    toggleModal: () => void
    eventPayload: EventPayload
    expensePayload: ExpensePayload
    eventMembersPayload: EventMembersPayload
    newExpensePayload: NewExpensePayload
}

const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    modalVariant: 'new_event',
    openModal: () => {},
    closeModal: () => {},
    toggleModal: () => {},
    eventPayload: null,
    expensePayload: null,
    eventMembersPayload: null,
    newExpensePayload: { members: [] },
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
    const [eventMembersPayload, setEventMembersPayload] =
        useState<EventMembersPayload>(null)
    const [newExpensePayload, setNewExpensePayload] =
        useState<NewExpensePayload>({ members: [] })

    const openModal = (
        variant: ModalVariant = 'new_event',
        eventPayload: EventPayload = null,
        expensePayload: ExpensePayload = null,
        eventMembersPayload: EventMembersPayload = null,
        newExpensePayload: NewExpensePayload = { members: [] }
    ) => {
        if (eventPayload) {
            setEventPayload(eventPayload)
        }

        if (expensePayload) {
            setExpensePayload(expensePayload)
        }

        if (eventMembersPayload) {
            setEventMembersPayload(eventMembersPayload)
        }

        if (newExpensePayload) {
            setNewExpensePayload(newExpensePayload)
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
                eventMembersPayload,
                newExpensePayload,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
