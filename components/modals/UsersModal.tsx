'use client'

import { useModalStore } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "../ui/Modal"

export const UsersModal = () => {
    const { onClose, isOpen, type, data, onOpen } = useModalStore()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = type === 'UsersModal' && isOpen

    const students = data?.students

    return (
        <Modal title="Your students of the course" description="you can reach out to them!" onClose={onClose} isOpen={isOpen}>
            <div className="p-4">
                <div className="flex flex-col items-start gap-1 overflow-y-auto">

                </div>
            </div>
        </Modal>
    )

}
