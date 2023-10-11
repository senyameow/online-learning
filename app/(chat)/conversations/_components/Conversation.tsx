'use client'
import { FullConvType } from '@/actions/(chat)/get-conversations';
import Avatar from '@/app/(dashboard)/_components/Avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react'
import DeleteChatButton from './DeleteChatButton';
import { Student } from '@prisma/client';
import ProfileButton from '@/components/ProfileButton';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { pusherClient } from '@/lib/pusher';
import { MessageType } from '@/actions/(chat)/get-messages';
import axios from 'axios';

// че надо? надо понимать группа или 1 чел
// имя
// ласт смска
// время последней смски
// онлайн ли пацан
// айдишник чтобы переходить на страничку этого диалога


interface ConversationProps {
    conversation: FullConvType;
    currentStudent: Student
}

export const Conversation = ({ conversation, currentStudent }: ConversationProps) => {

    const pathname = usePathname()

    const isSelected = pathname.includes(conversation?.id)

    let lastMessage = useMemo(() => {
        const messages = conversation?.messages || []
        return messages?.[messages?.length - 1]
    }, [conversation?.messages])

    const otherStudent = useMemo(() => {
        return conversation.students.find(student => student?.id !== currentStudent?.id)
    }, [conversation?.students])

    let hasOtherSeen = !!lastMessage?.seen.find(student => student.id === otherStudent?.id)

    let hasMeSeen = !!lastMessage?.seen.find(student => student.id === currentStudent.id)

    console.log(conversation?.lastMessageAt)

    return (
        <Link href={`/conversations/${conversation.id}`} className='w-full border rounded-xl cursor-pointer group transition relative'>
            <div className={cn(`p-2 flex flex-row justify-between items-start w-full transition  rounded-xl`, isSelected ? 'bg-black group-hover:bg-black/80' : 'bg-transparent group-hover:bg-gray-100')}>
                <div className='flex items-start flex-row gap-2 w-[75%]'>
                    <Avatar image_url={otherStudent?.image_url} />
                    <div className='flex flex-col items-start justify-between gap-2 '>
                        <span className={cn(`font-bold text-[16px] truncate max-w-[70%] `, isSelected && 'text-gray-100')}>{conversation?.name || otherStudent?.name}</span>
                        <div className='flex items-center gap-2 w-full'>
                            {lastMessage?.text && <span className={cn(`text-xs`, isSelected && 'text-neutral-100')}>{lastMessage?.student?.name}: </span>}
                            <span className={cn(`text-sm text-neutral-700`, isSelected && 'text-gray-100', hasMeSeen ? 'font-normal' : 'font-bold')}>
                                {lastMessage?.text ? lastMessage?.text : <span className='text-xs '>created</span>}
                            </span>
                            <div className={cn(`w-2 h-2 rounded-full`, hasOtherSeen ? ' opacity-0' : 'opacity-100', isSelected ? 'bg-white' : 'bg-black')} />
                        </div>
                    </div>
                </div>
                <span className='text-neutral-400 text-sm'>{format(new Date(conversation?.lastMessageAt!), 'p')}</span>
            </div>
            <DeleteChatButton isSelected={isSelected} id={conversation?.id} />
        </Link>
    )
}