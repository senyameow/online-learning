import { getChapter } from '@/actions/get-chapter'
import { Banner } from '@/components/Banner'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/VideoPlayer'

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

    console.log(muxData, 'MUX')

    return (
        <div className='flex flex-col h-full w-full'>
            {userProgress?.isCompleted && (
                <div className=''>
                    you completed this chapter
                </div>
            )}
            {!purchase && (
                <Banner canClose label='you have not purchased this course yet, next chapters will not be awailable to you' variant={'error'} />
            )}
            <div className="flex flex-col pb-20 max-w-4xl mx-auto h-full w-full">
                <div className="p-4">
                    <VideoPlayer
                        title={chapter.title}
                        chapterId={chapter.id}
                        playbackId={muxData?.playbackId!}
                        completeOnEnd={completeOnEnd}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id!}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChapterPage