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

    if (!userId) return redirect('sign-in')

    const categories = await db.category.findMany()

    const courses = await getDashboard({ userId: userId as string, title: searchParams.title, categoryId: searchParams.categoryId })



    return (
        <div className="flex flex-col w-full px-6 h-full">
            <div className='py-4 block'>
                <Search />
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>

            </div>
            <div className='md:mt-0'>
                <Queries data={categories} valueKey='categoryId' />
            </div>
            <CoursesList courses={courses} />
        </div>
    )
}

export default Dashboard