'use client'
import { FullConvType } from '@/actions/(chat)/get-conversations'
import React, { useEffect, useState } from 'react'

import EmptyState from '@/components/ui/EmptyState'
import { Message, Student } from '@prisma/client';
import { Conversation } from './Conversation';
import { pusherClient } from '@/lib/pusher';
import { ConvType } from '@/types';
import { find } from 'lodash';

interface ConversationsProps {
    conversations: FullConvType[];
    currentStudent: Student
}

const Conversations = ({ conversations, currentStudent }: ConversationsProps) => {

    const [items, setItems] = useState<FullConvType[]>(conversations)

    useEffect(() => {
        if (!currentStudent.email) return


        const conversationNewHandler = (conversation: FullConvType) => {
            setItems(prev => {
                if (find(prev, { id: conversation?.id })) {
                    return prev
                }
                return [...prev, conversation]
            })
        }

        const conversationUpdateHandler = ({ id, messages }: { id: string, messages: any[] }) => {
            setItems(prev => prev.map(oldConv => {
                if (oldConv?.id === id) {
                    return {
                        ...oldConv,
                        messages: [...oldConv.messages, messages[0]]
                    }
                }
                return oldConv
            }))
        }

        pusherClient.subscribe(currentStudent?.email)
        pusherClient.bind('conversation:new', conversationNewHandler)
        pusherClient.bind('conversation:update', conversationUpdateHandler)


        return () => {
            pusherClient.unsubscribe(currentStudent.email)
            pusherClient.unbind('conversation:new')
        }
    }, [currentStudent?.email])

    return (
        <div className='w-full h-full flex flex-col px-4 mx-auto items-center gap-3'>
            {items?.length > 0 ? items?.map(conversation => (
                <Conversation currentStudent={currentStudent!} key={conversation.id} conversation={conversation} />
            )) : (
                <EmptyState />
            )}
        </div>
    )
}

export default Conversations