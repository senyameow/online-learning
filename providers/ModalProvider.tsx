'use client'

import { DeleteStoreModal } from "@/components/modals/DeleteStoreModal"
import { StoreModal } from "@/components/modals/StoreModal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <StoreModal />
            <DeleteStoreModal />
        </>
    )
}