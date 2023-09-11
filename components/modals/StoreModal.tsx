'use client'

import { useModalStore } from "@/hooks/use-modal-store"
import { Modal } from "../ui/modal"

export const StoreModal = () => {

    const { onClose, isOpen } = useModalStore()

    return (

        < Modal title="create a store" description="create a store where you will sell products" isOpen={isOpen} onClose={onClose}>
            my modal
        </Modal >
    )
}