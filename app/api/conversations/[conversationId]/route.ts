import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function DELETE(req: Request, { params }: { params: { conversationId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const conversation = await db.conversation.delete({
            where: {
                id: params.conversationId
            }
        })

        return NextResponse.json(conversation, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}