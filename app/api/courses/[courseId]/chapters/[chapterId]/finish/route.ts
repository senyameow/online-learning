import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import Mux from "@mux/mux-node"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })


        const progress = await db.userProgress.update({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: params.chapterId
                }
            },
            data: {
                isCompleted: true
            }
        })

        return NextResponse.json(progress, { status: 200 })

    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }
}