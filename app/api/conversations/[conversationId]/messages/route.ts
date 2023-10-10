import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request, { params }: { params: { conversationId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { text, file_url } = await req.json()

        if (!text) return new NextResponse('No text provided', { status: 400 })

        const message = await db.message.create({
            data: {
                text,
                studentId: userId,
                conversationId: params.conversationId,
                file_url,
                seen: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                seen: true,
                student: true
            }
        })

        const updatedConv = await db.conversation.update({
            where: {
                id: params.conversationId
            },
            data: {
                lastMessageAt: message?.created_at,
                lastMessage: message?.text || message?.file_url,
                messages: {
                    connect: {
                        id: message?.id // хотим добавить смску на этот сервер
                    }
                }
            },
            include: {
                students: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        await pusherServer.trigger(params.conversationId, 'message:new', message)

        const lastMessage = updatedConv.messages[updatedConv.messages.length - 1]

        updatedConv.students.map(student => {
            pusherServer.trigger(student.email, 'conversation:update', {
                id: params.conversationId,
                messages: [lastMessage]
            })
        })

        return NextResponse.json(message, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}