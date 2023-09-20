'use client'
import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle, X } from 'lucide-react'
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
import { FileUpload } from '@/components/FileUpload'
import Image from 'next/image'

interface ImageFormProps {
    course: Course
}

const formSchema = z.object({
    image_url: z.string(),
})

const ImageForm = ({ course }: ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false)

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${course.id}`, values)
            router.refresh()
            setIsEditing(false)
            toast.success(`image has been updated!`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }



    return (
        <div className="mt-6 border bg-blue-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                Course image
                <Button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing && (
                        <><X className='w-4 h-4' /></>
                    )}
                    {!isEditing && !course.image_url && (
                        <>
                            <PlusCircle className="h-4 w-4" />
                        </>
                    )}
                    {!isEditing && course.image_url && (
                        <>
                            <Pencil className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !course.image_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={course.image_url}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload

                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ image_url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageForm