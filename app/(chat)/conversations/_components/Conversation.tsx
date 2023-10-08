import { FullConvType } from '@/actions/(chat)/get-conversations'
import React from 'react'

interface ConversationProps {
    conversation: FullConvType
}

const Conversation = ({ conversation }: ConversationProps) => {
    return (
        <div>
            {conversation.name}
        </div>
    )
}

export default Conversation