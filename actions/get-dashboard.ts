import { db } from "@/lib/db";
import { CourseWithCategoryAndProgress } from "@/types"
import { getProgress } from "./get-progress";



type DashboardCourses = {
    completedCourses: CourseWithCategoryAndProgress[];
    coursesInProgress: CourseWithCategoryAndProgress[];
}

export const getDashboard = async (userId: string): Promise<DashboardCourses> => {
    try {
        const userPurchases = await db.purchases.findMany({
            where: {
                userId
            }
        })
        const purchasedCoursesIds = userPurchases.map(purchase => purchase.courseId)
        const allCourses = await db.course.findMany({
            where: {
                id: {
                    in: purchasedCoursesIds
                },
                isPublished: true
            },
            include: {
                Category: true,
                Chapter: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        const coursesWithProgress = await Promise.all(allCourses.map(async (course) => ({
            ...course,
            progress: await getProgress(userId, course.id)
        })))

        const completedCourses = coursesWithProgress.filter(course => course.progress === 100).map(course => ({
            category: course.Category,
            chapters: course.Chapter,
            ...course
        }))
        const coursesInProgress = coursesWithProgress.filter(course => course.progress > 0 && course.progress < 100).map(course => ({
            category: course.Category,
            chapters: course.Chapter,
            ...course
        }))

        return {
            completedCourses,
            coursesInProgress
        }

    } catch (error) {
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}