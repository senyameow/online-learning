import { db } from "@/lib/db"
import { Category, Course } from "@prisma/client"
import axios from "axios";
import qs from 'query-string'
import { getProgress } from "./get-progress";

interface getCoursesProps {
    userId: string;
    title?: string;
    categoryId?: string;
}

type CourseWithCategoryAndProgress = {
    categories: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}


export const getCourses = async ({ userId, title, categoryId }: getCoursesProps): Promise<CourseWithCategoryAndProgress[]> => {
    try {

        const courses = await db.course.findMany({
            where: {
                userId,
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
            categories: course.Category,
            chapters: course.Chapter,
            progress: (course.Purchases.length === 0 ? null : await getProgress(userId, course.id)),
        })))

        return coursesWithCategoryAndProgress

    } catch (error) {
        console.log(error)
        return []
    }
}