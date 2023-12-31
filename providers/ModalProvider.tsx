'use client'

import { ConversationMembersModal } from "@/components/modals/ConversationMembersModal"
import CreateGroupModal from "@/components/modals/CreateGroupModal"
import DeleteChapterModal from "@/components/modals/DeleteChapterModal"
import DeleteConversationModal from "@/components/modals/DeleteConversation"
import DeleteCourse from "@/components/modals/DeleteCourseModal"
import { StudentsModal } from "@/components/modals/StudentsModal"
import { UsersModal } from "@/components/modals/UsersModal"
import { useEffect, useState } from "react"


export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <DeleteChapterModal />
            <DeleteCourse />
            <UsersModal />
            <StudentsModal />
            <CreateGroupModal />
            <ConversationMembersModal />
            <DeleteConversationModal />
        </>
    )
}