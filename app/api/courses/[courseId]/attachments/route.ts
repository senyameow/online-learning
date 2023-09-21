

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const { url } = await req.json()

        const attachment = await db.attachment.create({
            data: {
                title: url.split('/').pop(),
                courseId: params.courseId,
                url
            }
        })

        return NextResponse.json(attachment, { status: 200 })

    } catch (error) {

    }
}
