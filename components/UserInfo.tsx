import Container from '@/components/ui/Container'
import { Separator } from '@/components/ui/separator'
import { Note, Student } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import NoteForm from './ui/NoteForm'

interface StudentInfoProps {
    student: Student;
    otherUserNote?: Note
}

const StudentInfo = ({ student, otherUserNote }: StudentInfoProps) => {

    return (
        <Container>
            <div className='flex flex-col gap-[0.5px]'>
                <span className='text-white font-semibold'>{student?.name}</span>
                <span className='text-white font-semibold text-sm'>#{student?.id}</span>
            </div>
            <Separator />
            <div className='flex flex-col space-y-2'>
                <span className='text-white font-semibold uppercase text-[15px]'>senyacord member since</span>
                <span className='text-slate-200 text-xs '>{format(student?.created_at, 'MMM dd, yyyy')}</span>
            </div>
            <Separator />
            <NoteForm note={otherUserNote?.text} studentId={student?.id} />
        </Container>
    )
}

export default StudentInfo