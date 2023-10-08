import { FullConvType } from '@/actions/(chat)/get-conversations'
import React from 'react'

import EmptyState from '@/components/ui/EmptyState'
import { Student } from '@prisma/client';
import { Conversation } from './Conversation';

interface ConversationsProps {
    conversations: FullConvType[];
    currentStudent: Student
}

const Conversations = ({ conversations, currentStudent }: ConversationsProps) => {
    return (
        <div className='w-full h-full flex flex-col px-4 mx-auto items-center'>
            {conversations?.length > 0 ? conversations?.map(conversation => (
                <Conversation currentStudent={currentStudent!} key={conversation.id} conversation={conversation} />
            )) : (
                <EmptyState />
            )}
        </div>
    )
}

export default Conversations