import { db } from "@/lib/db"
import { Category, Course, Student } from "@prisma/client"
import axios from "axios";
import qs from 'query-string'
import { getProgress } from "./get-progress";
import { CourseWithCategoryAndProgress } from "@/types";

interface getCoursesProps {
    courseId: string
}




export const getStudents = async ({ courseId }: getCoursesProps): Promise<Student[]> => {
    try {

        const students = await db.student.findMany({
            where: {
                courses: {
                    some: {
                        id: courseId
                    }
                }
            }
        })

        return students

    } catch (error) {
        console.log(error)
        return []
    }
}