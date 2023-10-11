import { Category, Conversation, Course, Student, StudetsOnCourses } from "@prisma/client";

export type CourseWithCategoryAndProgress = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}
export type StudentWithCourseIdAndDate = Student & {
    courseId: string
    created_at: string;
}

export type ConvType = Conversation & {
    students: Student[]
}