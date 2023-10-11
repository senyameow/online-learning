import { FullConvType } from "@/actions/(chat)/get-conversations"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { ConvType } from "@/types"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"



export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { id, isGroup, name, students } = await req.json()
        if (!isGroup && !id) return new NextResponse('No user ID provided', { status: 400 })

        console.log(id, isGroup, name, students)

        let conversation: FullConvType

        if (!isGroup) {
            let conversations = await db.conversation.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    students: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                                {
                                    students: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            OR: [
                                {
                                    students: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                                {
                                    students: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                include: {
                    students: true
                }
            });

            if (conversations[0]) return NextResponse.json(conversations[0], { status: 200 })
        }


        if (!isGroup) {

            conversation = await db.conversation.create({
                data: {
                    isGroup,
                    name,
                    students: {
                        connect: [
                            { id: userId },
                            { id: id as string },
                        ]
                    },
                    lastMessageAt: new Date()
                },
                include: {
                    students: true,
                    messages: {
                        include: {
                            seen: true,
                            student: true
                        }
                    }
                }
            })
        }

        conversation = await db.conversation.create({
            data: {
                isGroup,
                name,
                students: {
                    connect: [
                        ...students.map((student: { value: string }) => ({
                            id: student.value
                        })),
                        { id: userId }
                    ]
                },
                lastMessageAt: new Date()
            },
            include: {
                students: true,
                messages: {
                    include: {
                        seen: true,
                        student: true
                    }
                }
            }
        })

        conversation?.students.forEach(student => {
            if (student.email) {
                console.log('GOGO')
                pusherServer.trigger(student?.email, 'conversation:new', conversation)
            }
        })

        return NextResponse.json(conversation, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}