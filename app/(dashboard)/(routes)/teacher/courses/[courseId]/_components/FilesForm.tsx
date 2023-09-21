'use client'
import { Button } from '@/components/ui/button'
import { Attachment, Course } from '@prisma/client'
import { FileIcon, ImageIcon, Pencil, PictureInPicture, PlusCircle, X } from 'lucide-react'
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

interface FilesFormProps {
    courseID: string,
    attachments: Attachment[]
}

const formSchema = z.object({
    url: z.string().min(1, ' '),
})

const FilesForm = ({ courseID, attachments }: FilesFormProps) => {

    const [isEditing, setIsEditing] = useState(false)

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post(`/api/courses/${courseID}/attachments`, values)
            const fileType = res.data.url.split('.').pop()
            router.refresh()
            setIsEditing(false)
            toast.success(`${fileType} has been updated!`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    const onDelete = async (id: string) => {
        try {
            const res = await axios.patch(`/api/courses/${courseID}/attachments/${id}`)
            router.refresh()
            setIsEditing(false)
            toast.success(`${res.data.title} has been deleted`)
        } catch (error) {
            toast.error('something went wrong')

        }
    }



    return (
        <div className="mt-6 border bg-blue-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                Course Attachments
                <Button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing && (
                        <><X className='w-4 h-4' /></>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4" />
                        </>
                    )}

                </Button>
            </div>
            {!isEditing && (
                !attachments.length ? (
                    <div className="italic text-neutral-500 text-sm font-bold py-2">
                        No attachments added
                    </div>
                ) : (
                    <div className="relative flex flex-col items-start gap-2 mt-2">
                        {attachments.map(attachment => {
                            const fileType = attachment.url.split('.').pop()
                            return (
                                <div key={attachment.id} className="flex items-center justify-center px-4 py-2 relative gap-2 group">
                                    {fileType === 'pdf' && <FileIcon />}
                                    {fileType !== 'pdf' && <PictureInPicture />}
                                    <a href={attachment.url} className='text-sky-700 hover:underline' target='_blank' rel='noopener noreferrer'>{attachment?.title}</a>
                                    <Button onClick={() => onDelete(attachment.id)} className='p-1 h-fit rounded-full opacity-0 group-hover:opacity-100 transition' variant={'ghost'}><X className='w-4 h-4' /></Button>
                                </div>
                            )
                        })}
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload

                        endpoint='courseFiles'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url });
                            }
                        }}
                    />

                </div>
            )}
        </div>
    )
}

export default FilesForm