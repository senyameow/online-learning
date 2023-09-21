import Warning from '@/app/(dashboard)/_components/Warning'
import IconCourse from '@/components/IconCourse'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { ArrowLeft, LayoutDashboard, ListChecks, Trash } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import Back from '@/components/Back'

const ChapterPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {


    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
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
            <div className='h-full p-6 '>
                <div className='w-full flex items-center justify-between pb-12'>
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
                            <h2 className='text-2xl font-semibold'>Customize Your Chapter</h2>
                        </div>
                        <TitleForm courseId={params.courseId} chapter={chapter} />
                        {/* <DescriptionForm course={course} />
                        <ImageForm course={course} />
                        <CategoryForm categories={categories} course={course} /> */}


                    </div>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <IconCourse icon={ListChecks} />
                            <h2 className='text-2xl font-semibold'>Chapters</h2>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChapterPage