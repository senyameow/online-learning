import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const getMessages = async (conversationId: string) => {
    try {

        const { userId } = auth()

        if (!userId) return []

        const messages = await db.message.findMany({
            where: {
                conversationId
            },
            include: {
                seen: true,
                student: true,
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        return messages

    } catch (error) {
        console.log(error)
        return []
    }
}

export type MessageType = Awaited<ReturnType<typeof getMessages>>[0]