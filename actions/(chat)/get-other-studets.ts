import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const getAllStudents = async () => {
    try {

        const { userId } = auth()

        const students = await db.student.findMany({
            where: {
                id: {
                    not: userId as string
                }
            }
        })

        return students

    } catch (error) {
        console.log(error)
        return []
    }
}