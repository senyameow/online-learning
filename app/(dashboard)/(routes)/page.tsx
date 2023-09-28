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
import InfoCard from '../_components/InfoCard'
import { CheckCircle, Clock } from 'lucide-react'

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

    if (completedCourses.length === 0 && coursesInProgress.length === 0) redirect('/browse')

    return (
        <div className="flex flex-col w-full px-6 h-full">
            <div className='py-4 block'>
                <Search />
            </div>
            <div className='md:mt-0'>
                <Queries data={categories} valueKey='categoryId' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                <InfoCard icon={Clock} label='In Progress' numberOfCourses={coursesInProgress.length} variant={'default'} />
                <InfoCard icon={CheckCircle} label='Completed' numberOfCourses={completedCourses.length} variant={'success'} />
            </div>
            <CoursesList courses={[...coursesInProgress, ...completedCourses]} />
        </div>
    )
}

export default Dashboard