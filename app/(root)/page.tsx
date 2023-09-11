'use client'
import { Modal } from "@/components/ui/modal"
import { useModalStore } from "@/hooks/use-modal-store"
import { UserButton } from "@clerk/nextjs/app-beta"
import { useEffect } from "react"


export default function Home() {

  const { onOpen, isOpen } = useModalStore()

  useEffect(() => {
    if (!isOpen) {

      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />

    </div>
  )
}
