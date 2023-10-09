'use client'
import React from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Combobox } from '../ui/Combobox'
import { Button } from '../ui/button'
import * as z from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import toast from 'react-hot-toast'
import Select from '../Select'
import { useStudentsStore } from '@/hooks/use-students-store'



const CreateGroupModal = () => {

    const form = useForm<FieldValues>({
        defaultValues: {
            name: '',
            students: []
        }
    })

    const { onClose, data, type, isOpen } = useModalStore()

    const { students } = useStudentsStore()

    const isModalOpen = isOpen && type === 'CreateGroup'

    const onSubmit = async () => {
        try {

        } catch (error) {
            toast.error('something went wrong while creating group')
        }
    }


    const members = form.watch('students')

    return (
        <Modal title="Create group with your friends" description="have a great chat!" onClose={() => onClose()} isOpen={isModalOpen}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input {...field} className='' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="students"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Members:</FormLabel>
                                <FormControl>
                                    <Select options={students?.map(student => ({
                                        label: student.name,
                                        value: student.id,
                                    }))!} value={members} onChange={(value) => {
                                        form.setValue('students', value, { shouldValidate: true })
                                    }} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={form.formState.isSubmitting}>
                        Save
                    </Button>
                </form>
            </Form>
        </Modal>
    )
}

export default CreateGroupModal