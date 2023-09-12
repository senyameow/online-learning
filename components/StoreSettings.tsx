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
import { Form, FormField } from './ui/form'

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
            name: ''
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

    const onSubmit = async () => {
        try {

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

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                    </form>
                </Form>
            </div>
            <Separator />
        </>
    )
}

export default StoreSettings