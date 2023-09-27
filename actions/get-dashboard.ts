import { db } from "@/lib/db"
import { Category, Course } from "@prisma/client"
import axios from "axios";
import qs from 'query-string'
import { getProgress } from "./get-progress";
import { CourseWithCategoryAndProgress } from "@/types";

interface getCoursesProps {
    userId: string;
    title?: string;
    categoryId?: string;
    completed?: boolean
}



export const getDashboard = async ({ userId, title, categoryId, completed }: getCoursesProps): Promise<CourseWithCategoryAndProgress[]> => {
    try {

        const results: any[] = []

        const userPurchases = await db.purchases.findMany({
            where: {
                userId
            }
        })

        const ids = userPurchases.map(pur => pur.id)


        const purchasedCourses = await db.course.findMany({
            where: {
                id: {
                    in: ids
                },
                title: title,
                categoryId: categoryId,
            },
            include: {
                Category: true,
                Chapter: {
                    select: {
                        id: true
                    }
                },
                Purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        if (completed) {
            purchasedCourses.forEach(async (course) => {
                let courseProgress = await getProgress(userId, course.id)
                if (courseProgress !== null && courseProgress > 0) {
                    results.push(course)
                }
            })
        }

        const coursesWithCategoryAndProgress: CourseWithCategoryAndProgress[] = await Promise.all(purchasedCourses.filter(async course => await getProgress(userId, course.id)).map(async (course) => ({
            category: course.Category,
            chapters: course.Chapter,
            progress: (course.Purchases.length === 0 ? null : await getProgress(userId, course.id)),
            ...course
        })))


        return coursesWithCategoryAndProgress

    } catch (error) {
        console.log(error)
        return []
    }
}