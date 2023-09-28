import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {

        const { courseId, userId } = await req.json()

        if (!courseId) return new NextResponse(`no course ID provided`, { status: 401 })
        if (!userId) return new NextResponse(`no user ID provided`, { status: 401 })

        const purchase = await db.purchases.create({
            data: {
                userId: userId,
                courseId
            }
        })



        return NextResponse.json(purchase, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('internal error', { status: 500 })
    }
}