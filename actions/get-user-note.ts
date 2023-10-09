import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const getUserNote = async (userId: string) => {
    try {

        const { userId: writerId } = auth()

        if (!writerId) return null

        return await db.note.findFirst({
            where: {
                writerId,
                userId
            },
        })

    } catch (error) {
        console.log(error)
        return null
    }
}