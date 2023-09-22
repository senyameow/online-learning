'use client'

import DeleteChapterModal from "@/components/modals/DeleteChapterModal"
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
        </>
    )
}