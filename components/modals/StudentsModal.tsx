'use client'

import { useModalStore } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "../ui/Modal"
import StudentList from "../StudentList"
import { useStudentsStore } from "@/hooks/use-students-store"
import AllStudentList from "../AllStudentsList"

export const StudentsModal = () => {
    const { onClose, isOpen, type } = useModalStore()

    const { students } = useStudentsStore()

    const isModalOpen = type === 'StudentsModal' && isOpen

    return (
        <Modal title="All people here!" description="have a great chat!" onClose={() => onClose()} isOpen={isModalOpen}>
            <div className="">
                <AllStudentList students={students!} />
            </div>
        </Modal>
    )

}
