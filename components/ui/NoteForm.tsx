'use client'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Plus } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import EmojiPicker from '../EmojiPicker'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import qs from 'query-string'
import { useDebounce } from '@/hooks/use-debounce'
import axios from 'axios'
import toast from 'react-hot-toast'

interface NoteFormProps {
    studentId: string;
    note: string;
}

const formSchema = z.object({
    text: z.string().min(1, ' ')
})

const NoteForm = ({ studentId, note }: NoteFormProps) => {

    console.log(studentId)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: note || '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/students/${studentId}/notes`, values)
            toast.success('note submitted')
        } catch (error) {
            toast.error('something went wrong while adding note..')
        }
    }

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='py-2 relative'>
                                    <Textarea
                                        disabled={form.formState.isSubmitting}
                                        onKeyDown={async e => {
                                            if (e.code === 'Enter' && !form.formState.isSubmitting) {
                                                e.preventDefault()
                                                console.log('SUBMIT')
                                                const values = {
                                                    text: form.getValues('text')
                                                }
                                                onSubmit(values)
                                            }
                                        }}
                                        {...field} placeholder={`click to add a note`} className='placeholder-slate-200 placeholder:text-sm border-none resize-none px-10 pl-4 bg-transparent text-white text-sm placeholder:text-white/60 focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 w-full disabled:text-neutral-400/70' />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default NoteForm