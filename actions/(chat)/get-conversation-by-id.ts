import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


export const getConversationById = async (id: string) => {
    try {

        const { userId } = auth()

        if (!userId) redirect('/sign-in')

        const conversation = await db.conversation.findUnique({
            where: {
                id
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

        return conversation

    } catch (error) {
        console.log(error)
        return null
    }
}