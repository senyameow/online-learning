import { getChapter } from '@/actions/get-chapter'
import { Banner } from '@/components/Banner'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/VideoPlayer'
import { Button } from '@/components/ui/button'
import { cn, formatter } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import Enroll from './_components/Enroll'
import { Eye, File } from 'lucide-react'
import NextChapterButton from './_components/NextChapter'

const ChapterPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {

    const { userId } = auth()

    if (!userId) return redirect('/')

    const {
        chapter,
        course,
        purchase,
        userProgress,
        attachments,
        muxData,
        nextChapter
    } = await getChapter({ chapterId: params.chapterId, courseId: params.courseId, userId })

    if (!chapter || !course) return redirect('/')

    // const isLocked = !chapter.isFree && !purchase

    const completeOnEnd = !!purchase && !userProgress?.isCompleted

    return (
        <div className='flex flex-col h-full w-full overflow-x-hidden'>

            {!purchase && !userProgress?.isCompleted && (
                <Banner canClose label='you have not purchased this course yet, next chapters will not be awailable to you' variant={'error'} />
            )}
            {userProgress?.isCompleted && (
                <Banner canClose label='you already completed this chapter' variant={'success'} />
            )}
            <div className="flex flex-col pb-20 max-w-4xl mx-auto h-full w-full px-6">
                <div className=" py-4">
                    <VideoPlayer
                        title={chapter.title}
                        chapterId={chapter.id}
                        playbackId={muxData?.playbackId!}
                        completeOnEnd={completeOnEnd}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id!}
                    />
                </div>
                <div className='w-full flex flex-col md:flex-row items-center justify-between'>
                    <div className='text-2xl font-bold mb-3'>
                        {chapter.title}
                    </div>
                    {!purchase && < Enroll price={Number(course.price)} courseId={params.courseId} chapterId={chapter.id} />}
                    <NextChapterButton nextChapterId={nextChapter?.id!} isCompleted={userProgress?.isCompleted!} courseId={params.courseId} chapterId={chapter.id} userId={userId} chapterTitle={chapter.title} />
                </div>
                <Separator className='my-4' />
                <div className='flex flex-col items-start'>
                    <span className='text-xl font-semibold mb-2'>What are you gonna learn?</span>
                    <span>{chapter.description}</span>
                </div>
                <Separator className='my-4' />

                <div className='text-2xl font-semibold mb-3'>
                    Recourses:
                </div>
                <div className=''>
                    {attachments.map(item => (
                        <a key={item.id} className={cn(`text-sky-600 hover:underline flex items-center w-full`)} href={item.url} target='_blank'>
                            <File className='w-4 h-4 mr-2' />
                            <p className=''>{item.title}</p>
                        </a>
                    ))}
                    {(attachments?.length === 0 || !attachments) && (
                        <div className='w-full py-6 text-sky-700 text-center text-xl '>
                            it seems there is no attachments in this chapter..
                        </div>
                    )}
                    {!purchase && (
                        <div className='w-full py-6 text-rose-700 text-center text-xl '>
                            You have to enroll course to see the attachments
                            <Eye className='w-4 h-4 ' />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ChapterPage