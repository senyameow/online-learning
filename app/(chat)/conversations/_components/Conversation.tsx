'use client'
import { FullConvType } from '@/actions/(chat)/get-conversations';
import Avatar from '@/app/(dashboard)/_components/Avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react'
import DeleteChatButton from './DeleteChatButton';
import { Student } from '@prisma/client';
import ProfileButton from '@/components/ProfileButton';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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

    const lastMessage = useMemo(() => {
        const messages = conversation?.messages || []
        return messages?.[messages?.length - 1]
    }, [conversation?.messages])

    const otherStudent = useMemo(() => {
        return conversation.students.find(student => student?.id !== currentStudent?.id)
    }, [conversation?.students])

    return (
        <Link href={`/conversations/${conversation.id}`} className='w-full border rounded-xl cursor-pointer group transition relative'>
            <div className={cn(`p-2 flex flex-row justify-between items-start w-full transition  rounded-xl`, isSelected ? 'bg-black group-hover:bg-black/80' : 'bg-transparent group-hover:bg-gray-100')}>
                <div className='flex items-start flex-row gap-2'>
                    <ProfileButton student={otherStudent!} />
                    <div className='flex flex-col items-start justify-between gap-2'>
                        <span className={cn(`font-bold text-[16px]`, isSelected && 'text-gray-100')}>{conversation.name || otherStudent?.name}</span>
                        <span className={cn(`text-xs text-neutral-500`, isSelected && 'text-gray-100')}>
                            {lastMessage?.text ? lastMessage?.text : 'conversation created'}
                        </span>
                    </div>
                </div>
                <span className='text-neutral-400 text-sm'>{format(conversation.lastMessageAt!, 'p')}</span>
            </div>
            <DeleteChatButton isSelected={isSelected} id={conversation?.id} />
        </Link>
    )
}