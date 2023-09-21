import Warning from '@/app/(dashboard)/_components/Warning'
import IconCourse from '@/components/IconCourse'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { LayoutDashboard, Trash } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import { Description } from '@radix-ui/react-dialog'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'

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
            {!course.isPublished && <Warning />}
            <div className='h-full p-6 '>
                <div className='w-full border flex items-center justify-between pb-20'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl font-bold'>Course Setup</span>
                        <span className='text-sm text-neutral-500'>Completed fields ({progress})</span>
                    </div>
                    <div className='flex flex-row items-center gap-2 '>
                        <Button disabled={completedSteps.length !== steps.length} className='border' variant={'ghost'}>
                            Publish
                        </Button>
                        <Button>
                            <Trash className='w-5 h-5 ' />
                        </Button>
                    </div>
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
                    <div className=''>qwe</div>
                </div>
            </div>
        </div>
    )
}

export default CoursePage