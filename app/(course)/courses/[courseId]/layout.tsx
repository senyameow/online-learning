import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import { auth } from '@clerk/nextjs'

const Course = async ({ children, params }: { children: React.ReactNode, params: { courseId: string } }) => {

    const { userId } = auth()

    const course = await db.course.findFirst({
        where: {
            id: params.courseId
        },
        include: {
            Chapter: true
        }
    })

    const bought = await db.purchases.findFirst({
        where: {
            userId: userId as string,
            courseId: params.courseId
        }
    })

    // if (!course) return redirect('/browse')

    return (
        <div className='h-full'>
            <div className='h-20 flex inset-y-0 fixed z-50 border w-full md:pl-56'>
                <Navbar title={course?.title!} chapters={course?.Chapter!} isBought={Boolean(bought)} />
            </div>
            <div className='hidden md:flex inset-y-0 fixed w-56 z-50'>
                <Sidebar title={course?.title!} chapters={course?.Chapter!} isBought={Boolean(bought)} />
            </div>
            <div className='md:pl-56 md:pt-20 h-full'>
                {children}
            </div>
        </div>
    )
}

export default Course