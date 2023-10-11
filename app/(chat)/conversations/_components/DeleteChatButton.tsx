'use client'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'
import { UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface DeleteChatButtonProps {
    id: string;
    isSelected: boolean
}

const DeleteChatButton = ({ id, isSelected }: DeleteChatButtonProps) => {

    const { onOpen } = useModalStore()

    return (
        <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen('deleteConversation', { conversationId: id })
        }} className={cn(`absolute top-[28px] right-3 z-50  opacity-0 group-hover:opacity-100 transition`, isSelected ? 'text-gray-200 hover:text-gray-100' : 'text-black/70 hover:text-black')}>
            <UtensilsCrossed className='w-6 h-6' />
        </button>
    )
}

export default DeleteChatButton