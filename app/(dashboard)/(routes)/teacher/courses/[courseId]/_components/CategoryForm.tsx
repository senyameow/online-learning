'use client'
import { Button } from '@/components/ui/button'
import { Category, Course } from '@prisma/client'
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
import { Combobox } from '@/components/ui/Combobox'

interface CategoryFormProps {
    course: Course;
    categories: Category[]
}

const formSchema = z.object({
    categoryId: z.string(),
})

const CategoryForm = ({ course, categories }: CategoryFormProps) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: course?.categoryId || '',
        }
    })

    const [isEditing, setIsEditing] = useState(false)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${course.id}`, values)
            router.refresh()
            setIsEditing(false)
            toast.success(`description has been updated!`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    const selectedCategory = categories.find(category => category?.id === course?.categoryId)

    return (
        <div className='p-4 pt-6 pr-6 bg-blue-100 font-bold rounded-md border'>
            <div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <span>Category</span>
                    <Button onClick={() => setIsEditing(!isEditing)} className='flex items-center'>
                        {isEditing ? <X className='w-4 h-4' /> : <Pencil className='w-4 h-4' />}
                    </Button>
                </div>

                {!selectedCategory && !isEditing && (
                    <div className='italic text-md font-semibold'>No Category</div>
                )}

                {(!selectedCategory || isEditing) && <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox {...field} options={categories.map(category => ({ label: category.title, value: category.id }))} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='' disabled={isSubmitting || !isValid}>
                            Save
                        </Button>
                    </form>
                </Form>}
                {selectedCategory && !isEditing && (
                    <div className='w-full text-xl font-bold mt-3'>
                        {selectedCategory.title}
                    </div>
                )}

            </div>
        </div>
    )
}

export default CategoryForm