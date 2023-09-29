import { db } from "./db"



export const getChat = async (memberOneId: string, memberTwoId: string) => {
    try {
        let chat = await findChat(memberOneId, memberTwoId) || await findChat(memberTwoId, memberOneId)
        if (!chat) {
            chat = await createChat(memberOneId, memberTwoId)
        }
        return chat

    } catch (error) {
        console.log(error)
        return null
    }
}

export const findChat = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.chat.findFirst({
            where: {
                AND: [
                    { memberOneId },
                    { memberTwoId }
                ]
            },
            include: {
                memberOne: true,
                memberTwo: true
            }
        })
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createChat = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.chat.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: true,
                memberTwo: true,
            }
        })
    } catch (error) {
        return null
    }
}