'use client'
import { Button } from '@/components/ui/button'
import { Chapter, Course, MuxData } from '@prisma/client'
import { Pencil, PlusCircle, Video, X } from 'lucide-react'
import React, { useState } from 'react'

import * as z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/FileUpload'
import MuxPlayer from '@mux/mux-player-react'

interface ChapterVideoProps {
    courseId: string
    initialData: Chapter & { muxData?: MuxData | null };

}

const formSchema = z.object({
    video_url: z.string(),
})

const ChapterVideo = ({ courseId, initialData }: ChapterVideoProps) => {

    const [isEditing, setIsEditing] = useState(false)

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${initialData.id}`, values)
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
                Chapter Video
                <Button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing && (
                        <><X className='w-4 h-4' /></>
                    )}
                    {!isEditing && !initialData.video_url && (
                        <>
                            <PlusCircle className="h-4 w-4" />
                        </>
                    )}
                    {!isEditing && initialData.video_url && (
                        <>
                            <Pencil className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.video_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer streamType='on-demand' playbackId={initialData.muxData?.playbackId!} />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload

                        endpoint='chapterVideo'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ video_url: url });
                            }
                        }}
                    />

                </div>
            )}
        </div>
    )
}

export default ChapterVideo