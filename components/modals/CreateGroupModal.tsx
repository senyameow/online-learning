'use client'
import React from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Combobox } from '../ui/Combobox'
import { Button } from '../ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(1, ' ').max(10, ' '),
    studentsId: z.string().array().min(1, ' ')
})

const CreateGroupModal = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const { onClose, data, type, isOpen } = useModalStore()

    const isModalOpen = isOpen && type === 'CreateGroup'

    const onSubmit = async () => {
        try {

        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <Modal title="Create group with your friends" description="have a great chat!" onClose={() => onClose()} isOpen={isModalOpen}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} className='' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='' disabled={isSubmitting}>
                        Save
                    </Button>
                </form>
            </Form>
        </Modal>
    )
}

export default CreateGroupModal