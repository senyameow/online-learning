import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const ChapterPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {

    const { userId } = auth()

    if (!userId) return redirect('/')



    return (
        <div>
            initial chapter
            {params.chapterId}
        </div>
    )
}

export default ChapterPage