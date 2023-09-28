import { Category, Course, Student, StudetsOnCourses } from "@prisma/client";

export type CourseWithCategoryAndProgress = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}
export type StudentWithCourseId = Student & {
    courseId: string
}