import { db } from '@/lib/db'
import React from 'react'

const ChapterPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {

    const initialChapter = await db.chapter.findFirst({
        where: {
            isFree: true,
            courseId: params.courseId
        }
    })

    return (
        <div>
            {params.chapterId}
        </div>
    )
}

export default ChapterPage