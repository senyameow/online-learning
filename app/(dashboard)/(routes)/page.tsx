import { db } from '@/lib/db'
import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import Queries from '@/components/ui/Queries'
import { getCourses } from '@/actions/get-courses'
import { auth } from '@clerk/nextjs'
import { Banner } from '@/components/Banner'
import { redirect } from 'next/navigation'
import Search from '../_components/Search'
import CoursesList from './browse/_components/CoursesList'
import { getDashboard } from '@/actions/get-dashboard'

interface DashboardProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const Dashboard = async ({ searchParams }: DashboardProps) => {

    const { userId } = auth()

    if (!userId) return redirect('/')

    const categories = await db.category.findMany()

    const {
        completedCourses,
        coursesInProgress
    } = await getDashboard(userId)


    return (
        <div className="flex flex-col w-full px-6 h-full">
            <div className='py-4 block'>
                <Search />
            </div>
            <div className='md:mt-0'>
                <Queries data={categories} valueKey='categoryId' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>1 card</div>
                <div>2 card</div>
            </div>
            <CoursesList courses={[...coursesInProgress, ...completedCourses]} />
        </div>
    )
}

export default Dashboard