import Warning from '@/app/(dashboard)/_components/Warning'
import IconCourse from '@/components/IconCourse'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { ArrowLeft, LayoutDashboard, ListChecks, Trash, Video } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import Back from '@/components/Back'
import DescriptionForm from './_components/DescriptionForm'
import { PlanForm } from './_components/PlanForm'
import ChapterVideo from './_components/ChapterVideo'
import { useModalStore } from '@/hooks/use-modal-store'
import ChapterActions from './_components/ChapterActions'

const ChapterPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {


    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
        },
        include: {
            muxData: true
        }
    })

    const course = await db.course.findFirst({
        where: {
            id: params.courseId
        }
    })

    if (!chapter) return redirect('/')

    const steps = [
        chapter.title,
        chapter.description,
        chapter.video_url,
    ]

    const completedSteps = steps.filter(step => Boolean(step))

    const progress = `${completedSteps.length} / ${steps.length}`

    return (
        <div className=''>
            {!chapter?.isPublished && <Warning type='chapter' />}
            <div className='mt-4 ml-4'>
                <Back />
            </div>
            <div className='h-full p-6 pb-4 '>
                <div className='w-full flex items-center justify-between pb-8'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-2xl font-bold'>Course Setup</span>
                        <span className='text-sm text-neutral-500'>Completed fields ({progress})</span>
                    </div>
                    <ChapterActions course={course!} chapter={chapter} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={LayoutDashboard} />
                            <h2 className='text-2xl font-semibold'>Customize Your Chapter</h2>
                        </div>
                        <TitleForm courseId={params.courseId} chapter={chapter} />
                        <DescriptionForm courseId={params.courseId} chapter={chapter} />
                        <PlanForm courseId={params.courseId} chapter={chapter} />


                    </div>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={Video} />
                            <h2 className='text-2xl font-semibold'>Video</h2>
                        </div>
                        <ChapterVideo courseId={params.courseId} initialData={chapter} />


                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChapterPage