import { db } from '@/lib/db'
import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import Queries from '@/components/ui/Queries'
import Search from '../../_components/Search'
import { getCourses } from '@/actions/get-courses'
import { auth } from '@clerk/nextjs'
import CoursesList from './_components/CoursesList'

interface BrowsePageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const BrowsePage = async ({ searchParams }: BrowsePageProps) => {

    const { userId } = auth()

    const categories = await db.category.findMany()

    const courses = await getCourses({ userId: userId as string, title: searchParams.title, categoryId: searchParams.categoryId })

    return (
        <div className="flex flex-col w-full px-6 h-full">
            <div className='py-4 block md:hidden mt-20'>
                <Search />
            </div>
            <div className='md:mt-0'>
                <Queries data={categories} valueKey='categoryId' />
            </div>
            <CoursesList courses={courses} />
        </div>
    )
}

export default BrowsePage