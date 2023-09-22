import Warning from '@/app/(dashboard)/_components/Warning'
import IconCourse from '@/components/IconCourse'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { DollarSign, File, LayoutDashboard, ListChecks, Trash } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import { Description } from '@radix-ui/react-dialog'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'
import FilesForm from './_components/FilesForm'
import ChapterForm from './_components/ChapterForm'
import CourseActions from './_components/CourseActions'

interface CoursePageProps {
    params: {
        courseId: string
    }
}

const CoursePage = async ({ params }: CoursePageProps) => {

    const { userId } = auth()

    if (!userId) return redirect('/')

    const course = await db.course.findFirst({
        where: {
            id: params.courseId,
            userId: userId as string
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            title: 'asc'
        }
    })
    const attachments = await db.attachment.findMany({
        where: {
            courseId: params.courseId
        },
        orderBy: {
            title: 'asc',
        }
    })

    const chapters = await db.chapter.findMany({
        where: {
            courseId: params.courseId,
        }
    })

    if (!course) return redirect('/')

    const steps = [
        course.title,
        course.description,
        course.image_url,
        course.price,
        course.categoryId,
    ]

    const completedSteps = steps.filter(step => Boolean(step))

    const progress = `${completedSteps.length} / ${steps.length}`



    return (
        <div className=''>
            {!course.isPublished && <Warning type='course' />}
            <div className='h-full p-6 '>
                <div className='w-full flex items-center justify-between pb-12'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl font-bold'>Course Setup</span>
                        <span className='text-sm text-neutral-500'>Completed fields ({progress})</span>
                    </div>
                    <CourseActions course={course} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={LayoutDashboard} />
                            <h2 className='text-2xl font-semibold'>Customize Your Course</h2>
                        </div>
                        <TitleForm course={course} />
                        <DescriptionForm course={course} />
                        <ImageForm course={course} />
                        <CategoryForm categories={categories} course={course} />


                    </div>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={ListChecks} />
                            <h2 className='text-2xl font-semibold'>Chapters</h2>
                        </div>
                        <ChapterForm courseId={course.id} chapters={chapters} />
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={DollarSign} />
                            <h2 className='text-2xl font-semibold'>Sell Your Course</h2>
                        </div>
                        <PriceForm course={course} />
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={File} />
                            <h2 className='text-2xl font-semibold'>Files</h2>
                        </div>
                        <FilesForm courseID={course?.id} attachments={attachments} />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CoursePage