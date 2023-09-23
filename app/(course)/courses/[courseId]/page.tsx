import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const CoursePage = async ({ params }: { params: { courseId: string } }) => {

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            Chapter: {
                where: {
                    isPublished: true
                },
                orderBy: {
                    position: 'desc'
                }
            },
        }
    })

    if (!course) return redirect('/')

    return (
        redirect(`/courses/${params.courseId}/chapters/${course?.Chapter[0]?.id}`)
    )
}

export default CoursePage