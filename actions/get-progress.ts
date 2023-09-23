import { db } from "@/lib/db"


export const getProgress = async (userId: string, courseId: string): Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true
            }, select: {
                id: true
            }
        })

        const publishedChaptersIds = publishedChapters.map(chapter => chapter.id)

        const completedChapters = await db.userProgress.count({
            where: {
                userId,
                chapterId: {
                    in: publishedChaptersIds
                },
                isCompleted: true
            }
        })

        return (completedChapters / publishedChaptersIds.length) * 100

    } catch (error) {
        console.log(error)
        return 0
    }
}