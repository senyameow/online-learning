import { CourseWithCategoryAndProgress } from '@/types'
import { Course } from '@prisma/client'
import React from 'react'

import NoResults from '@/components/NoResults'
import CourseCard from '@/components/CourseCard'

type CoursesWithCategoryAndProgress = {
    courses: CourseWithCategoryAndProgress[]
}



const CoursesList = ({ courses }: CoursesWithCategoryAndProgress) => {


    return (
        <div className='bg-white w-full h-full'>
            {courses.length === 0 && <NoResults />}
            {courses.length > 0 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {courses.map(course => (
                    <CourseCard price={Number(course.price)} key={course.id} id={course.id} image_url={course.image_url!} title={course.title} category={course.category?.title!} chapters={course.chapters.length} progress={course.progress} />
                ))}
            </div>}
        </div>
    )
}

export default CoursesList