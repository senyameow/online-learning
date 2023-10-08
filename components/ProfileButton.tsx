'use client'
import Avatar from '@/app/(dashboard)/_components/Avatar';
import { Student } from '@prisma/client';
import React from 'react'


interface ProfileButtonProps {
    student: Student
}

const ProfileButton = ({ student }: ProfileButtonProps) => {
    return (
        <button className='relative z-30 hover:opacity-80' onClick={() => { console.log(student.id) }}>
            <Avatar image_url={student?.image_url} />
        </button>
    )
}

export default ProfileButton