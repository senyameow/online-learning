import React from 'react'
import Navbar from '../../(dashboard)/_components/Navbar'
import Sidebar from '../../(dashboard)/_components/Sidebar'
import { getConversations } from '@/actions/(chat)/get-conversations'
import ConversationSidebar from '@/app/(dashboard)/_components/ConversationSidebar'
import { initialStudent } from '@/lib/initialStudent'

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {

    const conversations = await getConversations()

    const currentStudent = await initialStudent()

    return (
        <div className='h-full'>
            <div className='h-20 flex inset-y-0 fixed z-50 border w-full md:pl-56'>
                <Navbar />
            </div>
            <div className='hidden md:flex inset-y-0 fixed w-72 z-50'>
                <ConversationSidebar currentStudent={currentStudent} conversations={conversations} />
            </div>
            <div className='md:pl-72 md:pt-20 h-full'>
                {children}
            </div>
        </div>
    )
}

export default ConversationLayout