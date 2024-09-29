'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type ModalVariant = 'new_event'

type ModalContextType = {
    isOpen: boolean
    modalVariant: ModalVariant
    openModal: (variant: ModalVariant) => void
    closeModal: () => void
    toggleModal: () => void
}

const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    modalVariant: 'new_event',
    openModal: () => {},
    closeModal: () => {},
    toggleModal: () => {},
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

    const openModal = (variant) => {
        setModalVariant(variant)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setModalVariant(null)
    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <ModalContext.Provider
            value={{ isOpen, toggleModal, modalVariant, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    )
}
