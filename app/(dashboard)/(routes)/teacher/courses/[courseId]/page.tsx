import { db } from '@/lib/db'
import React from 'react'

interface CoursePageProps {
    params: {
        courseId: string
    }
}

const CoursePage = async ({ params }: CoursePageProps) => {

    const course = await db.course.findFirst({
        where: {
            id: params.courseId
        }
    })

    return (
        <div className='text-3xl font-bold'>
            {course?.title}
        </div>
    )
}

export default CoursePage