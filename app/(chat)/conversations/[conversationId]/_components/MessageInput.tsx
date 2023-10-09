"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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
import { Plus } from "lucide-react"
import { useModalStore } from "@/hooks/use-modal-store"
import EmojiPicker from "@/components/EmojiPicker"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface MessageInputProps {
    type: 'conversation' | 'group';
    conversationId: string
}

const formSchema = z.object({
    text: z.string().min(1, ' '),
})

export function MessageInput({ type, conversationId }: MessageInputProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })

    const { isSubmitting } = form.formState

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            form.reset()
            const message = await axios.post(`/api/conversations/${conversationId}/messages`, values)
            router.refresh()
        } catch (error) {
            toast.error('something went wrong')
        }

    }

    const { onOpen } = useModalStore()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='p-4 relative'>
                                    <button onClick={() => onOpen('messageImage', {})} className='absolute w-[24px] h-[24px] bg-zink-500 dark:bg-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-300 transition rounded-full left-8 top-7 p-1 flex items-center justify-center' type='button'> {/* кнопка для тригера модалки с загрузкой файлы (даем тип батон, т.к. не хотим, чтобы она затригерилась на энтер случайно)*/}
                                        <Plus className='text-[#313338] dark:text-white' size={20} />
                                    </button>
                                    <Input

                                        placeholder={`Message ${type === 'conversation' ? 'CONV' : '#'}`}
                                        {...field} disabled={isSubmitting} className='px-14 border focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 py-6 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-200' />
                                    {/* и небольшой смайлик, для модалки со смайлами */}
                                    <div className='absolute right-8 top-7'>
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
        </Form>
    )

}
