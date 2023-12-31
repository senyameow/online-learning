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
import { Textarea } from '@/components/ui/textarea'

interface DescriptionFormProps {
    courseId: string;
    chapter: Chapter
}

const formSchema = z.object({
    description: z.string().max(90, 'people will get border reading such a long text'),
})

const DescriptionForm = ({ courseId, chapter }: DescriptionFormProps) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: chapter?.description || '',
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapter.id}`, values)
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
                <div className='flex flex-row items-center justify-between w-full'>
                    <span className='text-2xl'>Chapter Description</span>
                    <Button disabled={isSubmitting} onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
                        {isOpen ? <X className='w-4 h-4' /> : <Pencil className='w-4 h-4' />}
                    </Button>
                </div>
                {!isOpen ? <div className='mt-2'>
                    {chapter?.description ? <span className='text-md font-semibold'>{chapter?.description}</span> : <span className='italic text-neutral-400 text-sm'>No description</span>}
                </div> : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea disabled={isSubmitting} placeholder="" {...field} className="border border-black ring-0 ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 outline-none font-normal" />
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

export default DescriptionForm