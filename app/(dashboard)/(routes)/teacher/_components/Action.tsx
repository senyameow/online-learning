'use client'
import { getStudents } from '@/actions/get-student'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useModalStore } from '@/hooks/use-modal-store'
import { StudentWithCourseIdAndDate } from '@/types'
import { Student } from '@prisma/client'
import { Copy, Edit, MoreHorizontal, School, Trash } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface CoursesActionProps {
    courseId: string;
    courseTitle: string;
    students: StudentWithCourseIdAndDate[]
}

const Action = ({ courseId, courseTitle, students }: CoursesActionProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const { onOpen } = useModalStore()

    const router = useRouter()

    const onUpdate = () => {
        router.push(`/teacher/courses/${courseId}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading}>
                <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={isLoading} onClick={() => onOpen(`UsersModal`, { courseInfo: { courseId }, students: students.filter(student => student.courseId === courseId) })}>
                    <div className="flex flex-row items-center">
                        <School className="w-4 h-4 mr-2" />
                        Students
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLoading} onClick={onUpdate}>
                    <div className="flex flex-row items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Update
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLoading} onClick={() => onOpen('DeleteCourse', { courseInfo: { courseId, courseTitle } })}>
                    <div className="flex flex-row items-center">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Action