'use client'
import { MessageType } from '@/actions/(chat)/get-messages'
import Avatar from '@/app/(dashboard)/_components/Avatar'
import ProfileButton from '@/components/ProfileButton'
import StudentPopUp from '@/components/StudentPopUp'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'

interface MessageProps {
    message: MessageType;
    currentUserId: string;
}

const Message = ({ message, currentUserId }: MessageProps) => {

    // здесь щас нам надо написать логику 
    // наша ли это смска?
    // кто ее увидел
    // и т.д.

    // как мы можем проверить, что смска наша?
    // нам надо понимать, кто мы
    // + нам надо какой-то уникальный идентификатор у смски, типо userId или что-то еще, что мы можем предоставить от нас
    // например, путь может быть такой: мы из сессии можем достать емэйл, он уникальный для каждого юзера => есть 1 уникальное значение
    // также к смске мы приклеили юзера, который отправил ее
    // значит можем просто сравнить их емэйлы!!



    const isOwn = currentUserId === message.student.id // вот так просто можем это достать

    const seenList = message.seen.filter(student => student.email !== message.student.email).map(student => student.name).join(', ')

    return (
        <div className={cn(`w-full flex h-fit py-2 pr-2`, isOwn ? 'items-end justify-end' : 'items-start justify-start')}>
            <div className={cn(`w-fit items-start gap-2`, isOwn ? 'flex flex-row-reverse' : ' flex flex-row')}>
                {/* <Avatar image_url={message?.student?.image_url!} isOnline={isOwn} /> */}
                <StudentPopUp student={message?.student} isOwn={isOwn} />
                {/* <ProfileButton student={message?.student} /> */}
                <div className={cn(`flex flex-col gap-1 justify-between items-start`)}>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='text-sm text-neutral-500 font-semibold'>{message?.student?.name}</span>
                        <span className='text-xs text-neutral-400'>{format(Date.now(), 'p')}</span>
                    </div>
                    <div className={cn(` rounded-full p-2 flex items-center justify-center w-fit`, isOwn ? 'bg-blue-400 place-self-end' : 'bg-gray-100 place-self-start')}>
                        <span className={cn(`font-bold text-sm`, isOwn ? 'text-white' : 'text-black')}>{message?.text}</span>
                    </div>
                    {message?.seen.length < 4 && isOwn && seenList && (
                        <span className='text-xs w-fit place-self-end text-neutral-400'>Seen by {seenList}</span>
                    )}
                    {message?.seen.length > 4 && isOwn && seenList && (
                        <span className='text-xs w-fit place-self-end text-neutral-400'>Seen by {seenList?.length} people</span>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Message