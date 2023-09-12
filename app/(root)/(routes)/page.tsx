'use client'
import { Modal } from "@/components/ui/modal"
import { useModalStore } from "@/hooks/use-modal-store"
import { UserButton } from "@clerk/nextjs/app-beta"
import { useEffect } from "react"


export default function Home() {

  const { onOpen, isOpen, type, onClose } = useModalStore()


  useEffect(() => {
    if (!isOpen) {

      onOpen('createStore')
    }

  }, [onOpen, isOpen])

  return (
    null
  )
}
