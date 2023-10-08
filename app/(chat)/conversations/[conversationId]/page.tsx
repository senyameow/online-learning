import React from 'react'

interface ConversationPageProps {
    params: {
        conversationId: string
    }
}

const ConversationPage = ({ params }: ConversationPageProps) => {
    return (
        <div>
            {params.conversationId}
        </div>
    )
}

export default ConversationPage