'use client'
import { FullConvType } from '@/actions/(chat)/get-conversations'
import { useModalStore } from '@/hooks/use-modal-store'
import React from 'react'

interface MembersButtonProps {
    conversation: FullConvType
}

const MembersButton = ({ conversation }: MembersButtonProps) => {

    const { onOpen } = useModalStore()

    return (
        <button onClick={() => onOpen('ConversationMembersModal', { members: conversation.students })} className='text-sm text-neutral-400 cursor-pointer hover:underline'>{conversation?.students.length} members</button>
    )
}

export default MembersButton