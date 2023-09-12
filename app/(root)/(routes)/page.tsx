'use client'
import { Modal } from "@/components/ui/modal"
import { useModalStore } from "@/hooks/use-modal-store"
import { UserButton } from "@clerk/nextjs/app-beta"
import { useEffect } from "react"


export default function Home() {

  const { onOpen, isOpen } = useModalStore()

  useEffect(() => {
    if (!isOpen) {

      onOpen('createStore')
    }
  }, [isOpen, onOpen])

  return (
    null
  )
}
