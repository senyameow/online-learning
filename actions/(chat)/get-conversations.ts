import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"


export const getConversations = async () => {
    try {

        const { userId } = auth()

        // мы могли сделать вот так: return session.user, но нам это не надо, т.к. по дефолту там слишком мало даты (почта имя картинка)
        // нам нужно больше инфы, но нам все равно нужна эта сессия потому что она дает что? правииильно уникальную дату - email
        // теперь по этому емэйлу мы можем обратиться к дбшке к табличке с юзерками и найти нашего юзера, и у нас будет гораздо больше инфы про него, которая нам понадобится

        const conversations = await db.conversation.findMany({
            where: {
                students: {
                    some: {
                        id: userId as string
                    }
                }
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

        return conversations

    } catch (error) {
        console.log(error)
        return []
    }
}

export type FullConvType = Awaited<ReturnType<typeof getConversations>>[0]