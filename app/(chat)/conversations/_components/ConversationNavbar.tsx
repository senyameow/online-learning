
import { FullConvType } from '@/actions/(chat)/get-conversations';
import Avatar from '@/app/(dashboard)/_components/Avatar';
import { Student } from '@prisma/client';
import React from 'react'
import MoreConversation from './MoreConversation';
import { getUserNote } from '@/actions/get-user-note';
import GroupPopUp from './GroupPopUp';
import MembersButton from './MembersButton';

interface ConversationInfoProps {
    conversation: FullConvType;
    // conversations: FullConvType[];
    currentStudent: Student
}

const ConversationInfo = async ({ conversation, currentStudent }: ConversationInfoProps) => {

    const otherStudent = conversation?.students.find(student => student.id !== currentStudent.id)

    const otherUserNote = await getUserNote(otherStudent?.id!)

    return (
        <nav className='bg-white shadow-md w-[calc(100vw-18rem)] h-full flex items-center '>
            <div className='w-full flex items-center justify-between px-4 pr-6'>
                {/* <div className='md:hidden'>
                    <MobileSidebar Student={currentStudent!} conversations={conversations} />
                </div> */}
                <div className='flex items-center h-full gap-2 w-full justify-between'>
                    <div className='flex items-center h-full gap-2'>
                        <div className='hidden md:block'>
                            <Avatar image_url={otherStudent?.image_url!} />
                        </div>
                        <div className='flex flex-col items-start justify-between h-full'>
                            <span>{conversation?.name || otherStudent?.name}</span>
                            {conversation?.isGroup ? <MembersButton conversation={conversation} /> : (
                                <span className='text-sm text-neutral-400'>Inactive</span>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {!conversation?.isGroup && <MoreConversation otherUserNote={otherUserNote!} conversation={conversation} name={conversation?.name || otherStudent?.name!} otherStudent={conversation?.isGroup ? null : otherStudent!} />}
                    {conversation.isGroup && <GroupPopUp />}
                </div>
            </div>
        </nav>
    )
}

export default ConversationInfo