import { Category, Course } from "@prisma/client";

export type CourseWithCategoryAndProgress = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}