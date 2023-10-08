'use client'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { db } from '@/lib/db'
import { UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface DeleteChatButtonProps {
    id: string
}

const DeleteChatButton = ({ id }: DeleteChatButtonProps) => {

    const { onOpen } = useModalStore()

    return (
        <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen('deleteConversation', { conversationId: id })
        }} className='absolute top-[24px] right-3 z-50 text-black/70 hover:text-black opacity-0 group-hover:opacity-100 transition'>
            <UtensilsCrossed className='w-6 h-6' />
        </button>
    )
}

export default DeleteChatButton