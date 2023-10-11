import { Student } from '@prisma/client';
import { create } from 'zustand'

interface ActiveListProps {
    studentsIds: string[]
    add: (id: string) => void
    remove: (id: string) => void
    set: (ids: string[]) => void
}

export const ActiveList = create<ActiveListProps>((set) => ({
    studentsIds: [],
    add: (id: string) => set((state) => ({ studentsIds: [...state.studentsIds, id] })),
    remove: (id: string) => set((state) => ({ studentsIds: state.studentsIds.filter(studentId => studentId !== id) })),
    set: (ids: string[]) => set({ studentsIds: ids })
}))