'use client'
import React from 'react'
import { useForm } from 'react-hook-form';

// что такое инпут? - это форма => нам нужен зод для валидации

import * as z from 'zod'

// кто помощник зода? правильно useForm (точнее работают в паре)

// и резолвер

import { zodResolver } from '@hookform/resolvers/zod';

// мега лень делать какие-то красивые инпуты, когда есть shadcn, просто возьму оттуда форму и инпут
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Plus, Smile } from 'lucide-react';

// за отправку формы будет отвечать аксиос

import axios from 'axios';

//для того, чтобы оно понимало, куда кидать смску, мы должны ему это как-то сказать
// типо мы пишем а он сразу понимает в какой канал и сервер или кому (ненененене)
// сразу приходит в голову солюшион через [] и парамсы, но может не хватить
// через парамсы мы сможем схватить только serverId и получить сервак по айдишнику и channelId и получить канал по айдишнику
// ну можно не париться и сделать через qs и через гет забрать просто все, что нам надо будет (А ЧТО НАМ НАДО БУДЕТ?)

import qs from 'query-string'
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/hooks/use-modal-store';
import { Button } from './ui/button';
import EmojiPicker from './EmojiPicker';

interface ChatInputProps {
    apiUrl: string;
    query?: Record<string, any>;
    name: string;
    type: 'channel' | 'conversation'
} // даем эти пропсы, т.к. мы будем переиспользовать этот компонент и для каналов и для 1х1

// что дает нам делать зод? 
// создавать форм схему, по которой будет происходить валидация


const formSchema = z.object({
    content: z.string().min(1, ' '), // ну мы не даем в ограничение сообщение, впадлу выводить его в инпуте для сообщений (зачем?)
})




const ChatInput = ({ apiUrl, name, type, query }: ChatInputProps) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({ // прокинули z.infer с типом нашей схемы формы
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '', // конечно, сначала поле для смски пустое
        },
        // не забываем прокинуть резолвер и в него схему

    })

    const isLoading = form.formState.isSubmitting // берем стейт лоадинга (ну на самом деле с сокетом не должно быть долгого лоадинга, но да и ладно, потому что нам нужно хахендлить кейс где узер просто заспамит чат ботом)

    const onSubmit = async (values: z.infer<typeof formSchema>) => { // онСабмитыч делаем, в него как обычно поступают какие-то значения с формы, мы так и говорим
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query // теперь понятно почему мы передаем и apiUrl (который будет идти на /api/socket/messages)
                // т.к. например, для сообщений юзерам будем использовать другую апишку
            })
            await axios.post(url, values)

            form.reset()
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content" // имя филда отвечает за свое значение в той форм схеме
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative'>

                                    <Input

                                        placeholder={`Message ${type === 'conversation' ? name : '#' + name}`}
                                        {...field} disabled={isLoading} className='border border-black focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 py-0 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-200' />
                                    {/* и небольшой смайлик, для модалки со смайлами */}
                                    <div className='absolute right-2 top-2'>
                                        <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                                    </div>
                                </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form >
    )
}

export default ChatInput