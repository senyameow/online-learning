import { StudentWithCourseIdAndDate } from '@/types';
import { Chapter, Course, Student } from '@prisma/client';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'




interface useModalStoreProps {
    students?: Student[] | [];
    onSudentsStore: (students: Student[] | []) => void
}

export const useStudentsStore = create<useModalStoreProps, [["zustand/persist", useModalStoreProps]]>(
    persist((set) => ({
        students: [],
        onSudentsStore: (students: Student[] | []) => set(() => ({ students: [...students] }))
    }),
        {
            name: 'students'
        }
    ))