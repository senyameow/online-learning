'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Bell, Book, LogOut, MessageCircle, School, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Search from './Search'
import { useModalStore } from '@/hooks/use-modal-store'
import { Student } from '@prisma/client'
import { useStudentsStore } from '@/hooks/use-students-store'

interface NavbarRoutesProps {
    students?: Student[]
}

const NavbarRoutes = ({ students }: NavbarRoutesProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const teacherPage = pathname.startsWith(`/teacher`)
    const isBrowsePage = pathname.includes(`/browse`)
    const isChatPage = pathname.startsWith('/conversations')

    const onExitTeacher = () => {
        router.push(`/browse`)
    }

    const onOpenTeacher = () => {
        router.push(`/teacher/courses`)
    }

    const { onOpen } = useModalStore()
    const { onSudentsStore } = useStudentsStore()

    return (
        <div className='flex flex-row items-center gap-4 w-full justify-between'>

            {isBrowsePage ? <div className='hidden md:block'><Search /></div> : <div></div>}
            <div className='flex flex-row items-center gap-4 '>
                {teacherPage ? <Button variant={'ghost'} onClick={onExitTeacher} className='text-md font-bold'>
                    <LogOut className='w-4 h-4 mr-2' />
                    Exit
                </Button> : <Button variant={'ghost'} onClick={onOpenTeacher} className='text-md font-bold'>
                    <Book className='w-4 h-4 mr-2' />
                    Teacher mode
                </Button>}
                {isChatPage ? <Button variant={'ghost'}>
                    <School className='w-6 h-6' onClick={() => router.push(`/courses`)} />
                </Button> : <Button onClick={() => router.push(`/conversations`)} variant={'ghost'} className='mr-2 relative'>
                    <MessageCircle className='w-6 h-6' />
                </Button>}
                {isChatPage && <Button variant={'ghost'} className='' onClick={() => {
                    onSudentsStore(students!)
                    onOpen('StudentsModal', {})
                }}>
                    <User className='w-6 h-6' />
                </Button>}
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default NavbarRoutes