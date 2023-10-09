import React from 'react'
import Body from './_components/Body'
import { getMessages } from '@/actions/(chat)/get-messages'
import { auth } from '@clerk/nextjs'

interface ConversationPageProps {
    params: {
        conversationId: string
    }
}

const ConversationPage = async ({ params }: ConversationPageProps) => {

    const initialMessages = await getMessages(params.conversationId)

    const { userId } = auth()

    return (
        <div className='flex flex-col h-[89.5%]'>
            <Body currentUserId={userId!} conversationId={params.conversationId} initialMessages={initialMessages} />
        </div>
    )
}

export default ConversationPage