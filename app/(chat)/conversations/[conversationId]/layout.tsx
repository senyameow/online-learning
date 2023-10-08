import React from 'react'
import { getConversations } from '@/actions/(chat)/get-conversations'
import ConversationSidebar from '@/app/(dashboard)/_components/ConversationSidebar'
import { initialStudent } from '@/lib/initialStudent'
import Navbar from '@/app/(dashboard)/_components/Navbar'
import { getConversationById } from '@/actions/(chat)/get-conversation-by-id'
import ConversationInfo from '../_components/ConversationNavbar'
import MobileSidebar from '@/app/(dashboard)/_components/MobileSidebar'

const ConversationLayout = async ({ children, params }: { children: React.ReactNode, params: { conversationId: string } }) => {

    const conversation = await getConversationById(params.conversationId)
    const currentStudent = await initialStudent()

    return (
        <div className='h-full w-full'>
            <div className='h-20 flex inset-y-0 fixed z-[100] border w-full'>
                {/* <MobileSidebar /> */}
                <ConversationInfo currentStudent={currentStudent!} conversation={conversation!} />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ConversationLayout