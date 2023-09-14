import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await req.json()

        const { searchParams } = new URL(req.url)

        const storeId = searchParams.get('storeId')

        const { label, value } = body

        if (!label) return new NextResponse('No name provided', { status: 400 })
        if (!value) return new NextResponse('No value provided', { status: 400 })

        const size = await db.size.create({
            data: {
                label,
                storeId: storeId as string,
                value,

            }
        })

        return NextResponse.json(size, { status: 200 })

    } catch (error) {
        console.log('CREATE_SIZE_ERROR', error)
        return new NextResponse('internal error', { status: 500 })
    }
}