import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'
import { FullConvType } from '@/actions/(chat)/get-conversations'
import Conversations from '@/app/(chat)/conversations/_components/Conversations'
import { Student } from '@prisma/client'
import ConversationsHeader from './ConversationsHeader'

interface ConversationSidebarProps {
    conversations: FullConvType[];
    currentStudent: Student
}

const ConversationSidebar = ({ conversations, currentStudent }: ConversationSidebarProps) => {

    return (
        <div className='border-r border-neutral-500 h-full w-full flex flex-col bg-white overflow-y-auto shadow-md shadow-blue-400'>
            <ConversationsHeader />
            <div className='w-full h-full'>
                <Conversations currentStudent={currentStudent} conversations={conversations} />
            </div>
        </div>
    )
}

export default ConversationSidebar