import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        const { name } = await req.json()

        const course = await db.course.create({
            data: {
                userId,
                title: name
            }
        })

        return NextResponse.json(course, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse(`internal error`, { status: 500 })
    }
}