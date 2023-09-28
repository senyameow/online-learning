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
}




export const getCourses = async ({ userId, title, categoryId }: getCoursesProps): Promise<CourseWithCategoryAndProgress[]> => {
    try {

        const courses = await db.course.findMany({
            where: {
                title: title,
                categoryId: categoryId
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


        const coursesWithCategoryAndProgress: CourseWithCategoryAndProgress[] = await Promise.all(courses.map(async course => ({
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