'use client'
import { useConfettiStore } from "@/hooks/use-confetti-store"
import ReactConfetti from 'react-confetti'


export const ConfettiProvider = () => {
    const { isOpen, onClose } = useConfettiStore()

    if (!isOpen) return null

    return (
        <ReactConfetti className="z-50" numberOfPieces={200} recycle={false} onConfettiComplete={onClose} />
    )
}