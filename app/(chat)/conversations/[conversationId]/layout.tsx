import React from 'react'
import { getConversations } from '@/actions/(chat)/get-conversations'
import ConversationSidebar from '@/app/(dashboard)/_components/ConversationSidebar'
import { initialStudent } from '@/lib/initialStudent'
import Navbar from '@/app/(dashboard)/_components/Navbar'
import { getConversationById } from '@/actions/(chat)/get-conversation-by-id'
import ConversationInfo from '../_components/ConversationNavbar'
import MobileSidebar from '@/app/(dashboard)/_components/MobileSidebar'
import { MessageInput } from './_components/MessageInput'

const ConversationLayout = async ({ children, params }: { children: React.ReactNode, params: { conversationId: string } }) => {

    const conversation = await getConversationById(params.conversationId)
    const currentStudent = await initialStudent()

    return (
        <div className='h-full w-full'>
            <div className='h-20 flex inset-y-0 fixed z-[100] border w-full '>
                {/* <MobileSidebar /> */}
                <ConversationInfo currentStudent={currentStudent!} conversation={conversation!} />
            </div>
            <main className='h-full w-full px-6 py-4 -pb-12'>
                {children}
                <MessageInput conversationId={params.conversationId} type={conversation?.isGroup ? 'group' : 'conversation'} />
            </main>
        </div>
    )
}

export default ConversationLayout