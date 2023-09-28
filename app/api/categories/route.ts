import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { title } = await req.json()

        const category = await db.category.create({
            data: {
                title
            }
        })
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        return new NextResponse(`something went wrong`, { status: 500 })
    }
}