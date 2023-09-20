'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Book, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const NavbarRoutes = () => {

    const pathname = usePathname()
    const router = useRouter()

    const teacherPage = pathname.startsWith(`/teacher`)

    const onExitTeacher = () => {
        router.push(`/browse`)
    }

    const onOpenTeacher = () => {
        router.push(`/teacher/courses`)
    }

    return (
        <div className='flex flex-row items-center gap-4 '>
            {teacherPage ? <Button onClick={onExitTeacher} className='text-md font-bold'>
                <LogOut className='w-4 h-4 mr-2' />
                Exit
            </Button> : <Button variant={'ghost'} onClick={onOpenTeacher} className='text-md font-bold'>
                <Book className='w-4 h-4 mr-2' />
                Teacher mode
            </Button>}
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default NavbarRoutes