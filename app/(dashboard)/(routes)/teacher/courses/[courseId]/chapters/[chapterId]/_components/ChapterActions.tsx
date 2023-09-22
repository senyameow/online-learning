'use client'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { Chapter, Course } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface ChapterActionsProps {
    chapter: Chapter
    course: Course
}

const ChapterActions = ({ chapter, course }: ChapterActionsProps) => {

    const router = useRouter()

    const steps = [
        chapter.title,
        chapter.description,
        chapter.video_url,
    ]

    const completedSteps = steps.filter(step => Boolean(step))

    const { onOpen } = useModalStore()

    const [isLoading, setIsLoading] = useState(false)

    const onPublish = async (value: boolean) => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/courses/${course?.id}/chapters/${chapter?.id}`, { isPublished: value })
            toast.success('chapter has been published')
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error(`something went wrong`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-row items-center gap-2 '>
            {chapter.isPublished ? <Button onClick={() => onPublish(false)} disabled={completedSteps.length !== steps.length || isLoading} className='border' variant={'ghost'}>
                Unpublish
            </Button> : <Button onClick={() => onPublish(true)} disabled={completedSteps.length !== steps.length || isLoading} className='border' variant={'ghost'}>
                Publish
            </Button>}
            <Button onClick={() => onOpen(`DeleteChapter`, { chapter: chapter, course: course })}>
                <Trash className='w-5 h-5 ' />
            </Button>
        </div>
    )
}

export default ChapterActions