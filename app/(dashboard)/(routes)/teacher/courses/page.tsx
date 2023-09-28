import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { CoursesColumn } from '../_components/columns'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'
import CoursesClient from '../_components/Client'
import CourseActions from './[courseId]/_components/CourseActions'

const CoursesPage = async () => {
    const { userId } = auth()

    if (!userId) return redirect('/sign-in')

    const myCourses = await db.course.findMany({
        where: {
            userId
        }
    })

    if (!myCourses) return redirect('/teacher/new')

    const students = await db.studetsOnCourses.findMany({
        include: {
            student: true
        }
    })

    const formattedStudents = students.map(student => ({
        id: student.studentId,
        name: student.student.name,
        image_url: student.student.image_url,
        courseId: student.courseId,
        created_at: format(student.created_at, 'MMMM do, yyyy')
    }))

    const formattedCourses: CoursesColumn[] = myCourses.map(course => ({
        id: course.id,
        title: course.title,
        price: formatter.format(Number(course.price)),
        status: course.isPublished,
        created_at: format(course.created_at, 'MMMM do, yyyy'),
        students: formattedStudents
    }))


    return (
        <div className="flex flex-col w-full">

            <div className="flex-1 p-8 pt-6 space-y-4">

                <CoursesClient items={formattedCourses} />
            </div>
        </div>
    )
}

export default CoursesPage