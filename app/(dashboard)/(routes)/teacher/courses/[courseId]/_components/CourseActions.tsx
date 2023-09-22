'use client'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { Chapter, Course } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseActionsProps {
    course: Course
}

const CourseActions = ({ course }: CourseActionsProps) => {

    const router = useRouter()

    const steps = [
        course.title,
        course.description,
        course.image_url,
        course.price,
        course.categoryId,
    ]

    const completedSteps = steps.filter(step => Boolean(step))

    const { onOpen } = useModalStore()

    const [isLoading, setIsLoading] = useState(false)

    const onAction = async (value: 'publish' | 'unpublish') => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/courses/${course?.id}/${value}`)
            toast.success('chapter has been published')
            router.push(`/teacher/courses/${course?.id}`)
            router.refresh()
        } catch (error) {
            toast.error(`something went wrong`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-row items-center gap-2 '>
            {course.isPublished ? <Button onClick={() => onAction('unpublish')} disabled={completedSteps.length !== steps.length || isLoading} className='border' variant={'ghost'}>
                Unpublish
            </Button> : <Button onClick={() => onAction('publish')} disabled={completedSteps.length !== steps.length || isLoading} className='border' variant={'ghost'}>
                Publish
            </Button>}
            <Button onClick={() => onOpen(`DeleteCourse`, { course: course })}>
                <Trash className='w-5 h-5 ' />
            </Button>
        </div>
    )
}

export default CourseActions