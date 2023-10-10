import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const getAllStudents = async (id: string) => {
    try {

        const students = await db.conversation.findUnique({
            where: {
                id
            },
            select: {
                students: true
            }
        })

        return students

    } catch (error) {
        console.log(error)
        return []
    }
}