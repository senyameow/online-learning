import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const { id } = await req.json()

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id
            }
        })

        return NextResponse.json(attachment, { status: 200 })

    } catch (error) {

    }
}