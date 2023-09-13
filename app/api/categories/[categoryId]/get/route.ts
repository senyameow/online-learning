

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { searchParams } = new URL(req.url)

        const storeId = searchParams.get('storeId')

        if (!params.categoryId) return new NextResponse('No store id provided', { status: 400 })

        const billboard = await db.category.findUnique({
            where: {
                id: params.categoryId,
                storeId: storeId as string
            }
        })

        return NextResponse.json(billboard, { status: 200 })

    } catch (error) {
        console.log('GET_CATEGORY_ERROR', error)
        return new NextResponse('internal error', { status: 500 })
    }
}

