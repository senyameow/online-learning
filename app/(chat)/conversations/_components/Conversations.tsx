import { FullConvType } from '@/actions/(chat)/get-conversations'
import React from 'react'
import Conversation from './Conversation'
import EmptyState from '@/components/ui/EmptyState'

interface ConversationsProps {
    conversations: FullConvType[]
}

const Conversations = ({ conversations }: ConversationsProps) => {
    return (
        <div className='w-full h-full flex flex-col'>
            {conversations?.length > 0 ? conversations?.map(conversation => (
                <Conversation key={conversation.id} conversation={conversation} />
            )) : (
                <EmptyState />
            )}
        </div>
    )
}

export default Conversations