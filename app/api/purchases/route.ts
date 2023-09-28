import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorizes', { status: 400 })

        const { courseId, userId: id } = await req.json()
        if (!courseId) return new NextResponse(`no course ID provided`, { status: 401 })
        if (!id) return new NextResponse(`no user ID provided`, { status: 401 })

        const purchase = await db.purchases.create({
            data: {
                userId,
                courseId
            }
        })

        return NextResponse.json(purchase, { status: 200 })

    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }
}