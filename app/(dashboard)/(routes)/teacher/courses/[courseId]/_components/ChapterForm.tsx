'use client'
import { Button } from '@/components/ui/button'
import { Chapter, Course } from '@prisma/client'
import { Pencil, X } from 'lucide-react'
import React, { useState } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import { useRouter } from 'next/navigation'
import ChapterCard from './ChapterCard'

interface ChapterFormProps {
    courseId: string;
    chapters: Chapter[]
}

const formSchema = z.object({
    title: z.string().min(1, ' ').max(15, ' '),
})

const ChapterForm = ({ courseId, chapters }: ChapterFormProps) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            setIsOpen(false)
            router.refresh()
            toast.success(`description has been updated!`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <div className='p-4 pt-6 pr-6 bg-blue-100 font-bold rounded-md border'>
            <div>
                <div className='flex flex-row items-center justify-between w-full mb-4'>
                    <span className='text-2xl'>Chapters</span>
                    <Button onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
                        {isOpen ? <X className='w-4 h-4' /> : <Pencil className='w-4 h-4' />}
                    </Button>
                </div>
                {chapters.length === 0 && !isOpen && <div className='italic text-neutral-400 text-sm'>No chapters added</div>}
                {chapters.map(chapter => (
                    <ChapterCard key={chapter.id} title={chapter.title} id={chapter.id} />
                ))}
                {!isOpen ? <div className='mt-2'>
                </div> : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="" {...field} className="border border-black ring-0 ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 outline-none font-normal" />
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

export default ChapterForm