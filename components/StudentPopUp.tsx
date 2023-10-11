'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useModalStore } from '@/hooks/use-modal-store'
import { Edit, MoreHorizontal, School, Trash, Users } from 'lucide-react'
import React, { useState } from 'react'
import StudentInfo from './UserInfo'
import { Student } from '@prisma/client'
import Avatar from '@/app/(dashboard)/_components/Avatar'

interface StudentPopUpProps {
    student: Student
    isOwn?: boolean
}

const StudentPopUp = ({ student, isOwn }: StudentPopUpProps) => {

    const [isLoading, setIsLoading] = useState(false)

    const { onOpen, data } = useModalStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading}>
                <Avatar image_url={student?.image_url} isOnline={isOwn} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' align='start' className='mr-12 z-999 w-fit h-full bg-gray-700'>
                <div className='absolute left-0 right-0 top-0 w-[326px] h-[100px]'>
                    <div className='w-full absolute top-0 inset-0 bg-gray-200' />
                </div>
                <div className='absolute bottom-0 w-full h-[calc(100vh-150px)]'>
                    {/* <div className=' w-[200px] absolute bottom-0 h-[calc(100%-140px)] bg-slate-900/80' /> */}
                </div>
                <div className='px-4 py-6 pt-12 flex flex-col w-full h-full items-start gap-4 relative z-[999]'>
                    <Avatar image_url={student?.image_url} className='md:w-[80px] md:h-[80px]' trackerClassName='md:w-4 md:h-4 right-[2px] top-[2px]' />
                    <StudentInfo student={student} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StudentPopUp