'use client'
import React from 'react'

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
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Course must be at least 3 characters.",
    }),
})

const page = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    const { isSubmitting, isValid } = form.formState


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post(`/api/courses`, values)
            router.push(`/teacher/courses/${res.data.id}`)
        } catch (error) {
            toast.error('something went wrong')
            console.log(error)
        }
    }

    return (
        <div className='h-full flex items-center justify-center flex-col gap-6 max-w-[800px] mx-auto'>
            <div className='flex items-center flex-col gap-6 w-full '>

                <div className=' w-full'>
                    <div className='text-3xl font-bold'>
                        Name Your Course
                    </div>
                    <div className='text-neutral-500 text-lg '>
                        What would you like to name your course? Don't worry, you can always change it later
                    </div>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="'Web Design'" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" className='mr-4 border' variant={'ghost'}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting || !isValid}>Continue</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default page