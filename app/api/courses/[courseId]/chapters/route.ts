import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const { title } = await req.json()

        const course = await db.chapter.create({
            data: {
                title,
                courseId: params.courseId
            }
        })

        return NextResponse.json(course, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse(`internal error`, { status: 500 })
    }
}