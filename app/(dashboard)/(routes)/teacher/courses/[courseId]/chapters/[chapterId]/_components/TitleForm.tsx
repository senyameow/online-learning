'use client'
import { Button } from '@/components/ui/button'
import { Chapter } from '@prisma/client'
import { Pencil, X } from 'lucide-react'
import React, { useState } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import EmojiPicker from '@/components/EmojiPicker'

interface TitleFormProps {
    chapter: Chapter;
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(3, {
        message: 'chapter should have a title'
    }).max(12, { message: 'wowowowow chill out, big title!' }),
})

const TitleForm = ({ chapter, courseId }: TitleFormProps) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: chapter?.title,
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapter.id}`, values)
            setIsOpen(false)
            router.refresh()
            toast.success(`title has been updated!`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <div className='p-4 pt-6 pr-6 bg-blue-100 font-bold rounded-md border'>
            <div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <span className='text-2xl'>Course Title</span>
                    <Button onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
                        {isOpen ? <X className='w-4 h-4' /> : <Pencil className='w-4 h-4' />}
                    </Button>
                </div>
                {!isOpen ? <div className='mt-2'>
                    {chapter.title ? <span className='text-md font-semibold'>{chapter?.title}</span> : <span className='italic text-muted-forehead'>No title</span>}
                </div> : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input disabled={isSubmitting} placeholder="" {...field} className="border border-black ring-0 ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 outline-none font-normal relative" />
                                                <div className='absolute top-2 right-2'>
                                                    <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)} />
                                                </div>
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='' disabled={isSubmitting || !isValid}>
                                Save
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    )
}

export default TitleForm