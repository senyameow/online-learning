'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Heading from './Heading'
import { Separator } from './ui/separator'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

interface StoreSettingsProps {
    name: string;
    storeId: string
}

const formSchema = z.object({
    name: z.string()
        .min(1, {
            message: 'name should contain at least 1 character'
        })
        .max(10, {
            message: 'name of your store is soooo big'
        })
})

const StoreSettings = ({ name, storeId }: StoreSettingsProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    // const deleteStore = async () => {
    //     try {
    //         setIsLoading(true)
    //         const res = await axios.delete(`/api/${storeId}/delete`)
    //         toast.success('You Successfully Deleted Store')

    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <Heading title='settings' description='change / delete Your Store' />

                <Button onClick={() => { }} variant={'destructive'} className='flex items-center justify-center'>
                    <Trash className='w-4 h-4' />
                </Button>


            </div>
            <Separator />
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3 gap-12'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='name of your store' disabled={isLoading} {...field} className='focus-visible:ring-0 focus-visible:ring-offset-0' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} type='submit'>Change</Button>

                </form>
            </Form>
        </>
    )
}

export default StoreSettings