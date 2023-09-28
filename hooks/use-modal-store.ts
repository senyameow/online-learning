import { StudentWithCourseId } from '@/types';
import { Chapter, Course } from '@prisma/client';
import { create } from 'zustand'

export type ModalType = 'DeleteChapter' | 'DeleteCourse' | 'UsersModal'

interface ModalData {
    chapter?: Chapter;
    course?: Course;
    courseInfo?: {
        courseTitle?: string;
        courseId?: string;
    }
    students?: StudentWithCourseId[]
}

interface useModalStoreProps {
    type: ModalType | null;
    data?: ModalData | null;
    isOpen: boolean;
    onOpen: (type: ModalType, data: ModalData | null) => void;
    onClose: () => void;
}

export const useModalStore = create<useModalStoreProps>((set) => ({
    type: null,
    data: undefined,
    isOpen: false,
    onOpen: (type: ModalType, data: ModalData | null) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}))