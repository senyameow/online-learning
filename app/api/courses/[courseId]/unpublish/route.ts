import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })


        const course = await db.course.update({
            where: {
                id: params.courseId
            },
            data: {
                isPublished: false
            }
        })

        return NextResponse.json(course, { status: 200 })

    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }
}