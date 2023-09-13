'use client'

import { BillboardModal } from "@/components/modals/CreateBillboard"
import { CategoryModal } from "@/components/modals/CreateCategory"
import { DeleteStoreModal } from "@/components/modals/DeleteStoreModal"
import { StoreModal } from "@/components/modals/StoreModal"
import { BillboardUpdateModal } from "@/components/modals/UpdateBillboard"
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
            <BillboardModal />
            <BillboardUpdateModal />
            <CategoryModal />
        </>
    )
}