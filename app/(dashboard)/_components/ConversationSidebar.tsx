import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'
import { FullConvType } from '@/actions/(chat)/get-conversations'
import Conversations from '@/app/(chat)/conversations/_components/Conversations'

interface ConversationSidebarProps {
    conversations: FullConvType[]
}

const ConversationSidebar = ({ conversations }: ConversationSidebarProps) => {

    return (
        <div className='border-r border-neutral-500 h-full w-full flex flex-col bg-white overflow-y-auto shadow-md shadow-blue-400'>
            <div className='p-6 flex items-center justify-center'>
                <span className='font-bold text-3xl'>Conversations</span>
            </div>
            <div className='w-full h-full'>
                <Conversations conversations={conversations} />
            </div>
        </div>
    )
}

export default ConversationSidebar