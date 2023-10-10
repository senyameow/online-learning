'use client'
import EmptyState from '@/components/ui/EmptyState'
import { Ghost } from 'lucide-react'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import Message from './Message'
import axios from 'axios'
import { MessageType } from '@/actions/(chat)/get-messages'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface BodyProps {
    initialMessages: MessageType[];
    conversationId: string;
    currentUserId: string;
}

const Body = ({ initialMessages, conversationId, currentUserId }: BodyProps) => {

    const [messages, setMessages] = useState<MessageType[]>(initialMessages)

    const chatRef = useRef<ElementRef<'div'>>(null)
    const bottomRef = useRef<ElementRef<'div'>>(null)

    // начинаем прописывать логику просмотра смски.
    // т.е. как мы будем понимать, что смску просмотрели
    // нам надо пушить того юзера, кто просмотрел в seen для этой смски
    // возникает ооочень много вопросов
    // во-первых, как юзер будет "ПРОСМАТРИВАТЬ" смску, такой просто функции нет, надо будет что-то думать
    // во-вторых, как мы будем реализовывать пуш юзера туда? - более легкий вопрос. Через запрос будем апдейтить seen для смски, но опять таки надо понимать для какой
    // т.е. как-то привязать к каждой смске реф, через эффект поставить прослушку скрола, и если дошел до рефа, то этого юзера кидаем в бади запроса и обновляем
    // сейчас +- прояснилось, как можно это сделать в теории, хз как на практике

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]) // чат прогрузился (т.е. юзер нажал на него, его кинуло на юрл чата => он просмотрел смску, тогда мы постзапрос делаем и обновляем наш прикол)

    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView()

        pusherClient.bind('messages:new', messageHandler)
        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new')
        }
    }, [conversationId])

    const messageHandler = (message: MessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`)
        setMessages(prev => {
            console.log(message)
            if (find(prev, { id: message.id })) {
                return [...prev]
            }
            return [...prev, message]
        })
        bottomRef.current?.scrollIntoView()
    }

    return (
        <div className='h-full overflow-y-auto scrollbar scrollbar-thumb-gray-900/10 scrollbar-track-transparent'>
            {messages.length === 0 && <EmptyState icon={Ghost} text='Start converstaion right now!' />}
            {messages?.map((message, ind) => (
                <Message currentUserId={currentUserId} message={message} />
            ))}
            <div ref={bottomRef} className='pt-20' />
        </div>
    )
}

export default Body