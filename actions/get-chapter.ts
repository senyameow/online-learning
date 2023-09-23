import { db } from "@/lib/db"
import { Attachment } from "@prisma/client";

interface getChapterProps {
    chapterId: string;
    courseId: string;
    userId: string
}

export const getChapter = async ({ chapterId, courseId, userId }: getChapterProps) => {
    try {

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        })

        const purchase = await db.purchases.findFirst({
            where: {
                AND: {
                    userId,
                    courseId
                }
            }
        })

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            },
            select: {
                price: true
            }
        })



        if (!course || !chapter) throw new Error('No chapter or course found')

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            }
        })

        let attachments: Attachment[] = []
        let muxData = null
        let nextChapter = null

        if (purchase || chapter.isFree) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId
                }
            })
            muxData = await db.muxData.findFirst({
                where: {
                    chapterId
                }
            })
            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId,
                    isPublished: true,
                    position: {
                        gt: chapter.position!
                    }
                },
                // orderBy
            })
        }

        return {
            chapter,
            course,
            purchase,
            userProgress,
            attachments,
            muxData,
            nextChapter
        }

    } catch (error) {
        return {
            chapter: null,
            price: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null
        }
    }
}