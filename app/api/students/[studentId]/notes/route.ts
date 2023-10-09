

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: Request, { params }: { params: { studentId: string } }) {
    try {

        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        const { text } = await req.json() // + надо как-то захендлить создание группы

        if (!params.studentId) return new NextResponse('No user Id provided', { status: 400 })

        if (text.length === 0) return new NextResponse('')

        let note = await db.note.findFirst({
            where: {
                userId: params.studentId,
                writerId: userId
            }
        })

        if (!note) {
            note = await db.note.create({
                data: {
                    text,
                    userId: params.studentId,
                    writerId: userId
                }
            })
        }

        note = await db.note.update({
            where: {
                id: note.id
            },
            data: {
                text
            }
        })



        return NextResponse.json(note, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}