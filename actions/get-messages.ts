

// import { db } from "@/lib/db"
// import { Category, Chat, Course, DirectMessage, Member, Student } from "@prisma/client"
// import axios from "axios";
// import qs from 'query-string'
// import { getProgress } from "./get-progress";
// import { CourseWithCategoryAndProgress } from "@/types";


// type ChatWithMessagesWithMembers = Chat & {
//     memberOne: Member,
//     memberTwo: Member,
//     directMessages: DirectMessage[]
// }



// export const Messages = async (chatId: string): Promise<ChatWithMessagesWithMembers> => {
//     try {

//         const chat = await db.chat.findFirst({
//             where: {
//                 id: chatId
//             },
//             include: {
//                 memberOne: true,
//                 memberTwo: true,
//                 directMessages: true
//             }
//         })

//         return chat

//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }