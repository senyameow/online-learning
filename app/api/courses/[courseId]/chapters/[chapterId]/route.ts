import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const body = await req.json()

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(chapter, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse(`internal error`, { status: 500 })
    }
}