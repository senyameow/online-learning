import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { conversationId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const conversation = await db.conversation.findUnique({
            where: {
                id: params.conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                students: true
            } // грубо говоря получили диалог + смски и для каждой смски список юзеров, и еще юзеров учавствующих в диалоге
        }) // находим диалог, на который он нажал, т.к. в нем хотим обновить список seen

        if (!conversation) return new NextResponse(`Invalid ID`, { status: 400 })

        const lastMessage = conversation.messages[conversation.messages.length - 1] // нам не нужна строка, которую мы засторили в lastMessage, нам нужна сама смска, ее айди и тд, юзер
        // по айдишнику этой смски мы найдем смску и апдейтнем seen для нее
        // вопрос: почему только у lastMessage? - а нахрена у всех обновлять, когда понятно, что если просмотрел ласт (НУ ТИПО ПРОСМОТРЕЛ - НАЖАЛ ПРОСТО НА ДИАЛОГ, ВПАДЛУ С РЕФАМИ МУЧАТЬСЯ), то просмотрел все смски)))
        if (!lastMessage) return NextResponse.json(conversation, { status: 200 })

        const updatedMessage = await db.message.update({
            where: {
                id: lastMessage.id // обновляем именно смску!
            },
            data: {
                seen: { // для той смски обновляем список seen
                    connect: { // в него просто кидаем того юзера, который нажал на диалог
                        id: userId as string // да просто его айдишник
                    }
                }
            },
            include: {
                seen: true, // можем забрать еще штук по пути полезных, вдруг пригодятся
                student: true // и этого чела возьмем
            }
        })

        return NextResponse.json(updatedMessage, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}