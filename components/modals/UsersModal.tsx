'use client'

import { useModalStore } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import { getStudents } from "@/actions/get-student"
import StudentList from "../StudentList"

export const UsersModal = () => {
    const { onClose, isOpen, type, data, onOpen } = useModalStore()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = type === 'UsersModal' && isOpen

    const students = data?.students

    return (
        <Modal title="Your students of the course" description="you can reach out to them!" onClose={() => onClose()} isOpen={isModalOpen}>
            <div className="">
                <StudentList students={students!} />
            </div>
        </Modal>
    )

}
