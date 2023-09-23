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
                    position: 'asc'
                }
            },
        }
    })

    // TODO: сделать так, чтобы могло редиректить только на фрищный чаптер, если такого нет, то будет редиректить на другую страницу, где будет просто инфа и кнопка купить, или отзывы, хз короче, что-то


    if (!course) return redirect('/')

    return (
        redirect(`/courses/${params.courseId}/chapters/${course?.Chapter[0]?.id}`)
    )
}

export default CoursePage