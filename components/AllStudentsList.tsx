'use client'
import { StudentWithCourseIdAndDate } from '@/types'
import React from 'react'
import { Student } from '@prisma/client'
import EmptyState from './ui/EmptyState'
import MiniStudentCard from './MiniStudentCard'

interface AllStudentListProps {
    students: Student[]
}

const AllStudentList = ({ students }: AllStudentListProps) => {

    return (
        <div className="flex flex-col items-start gap-1 overflow-y-auto">
            {students?.map(student => (
                <MiniStudentCard key={student.id} name={student.name} image_url={student.image_url} id={student.id} />
            ))}
            {students.length === 0 && (
                <EmptyState />
            )}
        </div>
    )
}

export default AllStudentList