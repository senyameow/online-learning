import { StudentWithCourseIdAndDate } from '@/types'
import React from 'react'
import StudentCard from './StudentCard'

interface StudentListProps {
    students: StudentWithCourseIdAndDate[]
}

const StudentList = ({ students }: StudentListProps) => {
    return (
        <div className="flex flex-col items-start gap-1 overflow-y-auto">
            {students?.map(student => (
                <StudentCard key={student.id} name={student.name} image_url={student.image_url} id={student.id} date={student.created_at} />
            ))}
        </div>
    )
}

export default StudentList