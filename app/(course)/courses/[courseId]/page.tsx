import { db } from '@/lib/db'
import React from 'react'

const CoursePage = async ({ params }: { params: { courseId: string } }) => {

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            Chapter: true
        }
    })

    return (
        <div className='bg-white'>
            <div className='px-12 pt-2 flex flex-col items-start'>
                wqe
            </div>
        </div>
    )
}

export default CoursePage