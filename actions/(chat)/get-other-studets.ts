import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const getAllStudents = async () => {
    try {

        const { userId } = auth()

        // мы могли сделать вот так: return session.user, но нам это не надо, т.к. по дефолту там слишком мало даты (почта имя картинка)
        // нам нужно больше инфы, но нам все равно нужна эта сессия потому что она дает что? правииильно уникальную дату - email
        // теперь по этому емэйлу мы можем обратиться к дбшке к табличке с юзерками и найти нашего юзера, и у нас будет гораздо больше инфы про него, которая нам понадобится

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