'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Book, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Search from './Search'

const NavbarRoutes = () => {

    const pathname = usePathname()
    const router = useRouter()

    const isTeacherPage = pathname.startsWith(`/teacher`)
    const isBrowsePage = pathname === `/browse`

    const isStudentPage = pathname.startsWith(`/courses`)

    const onExit = () => {
        router.push(`/browse`)
    }

    const onOpenTeacher = () => {
        router.push(`/teacher/courses`)
    }


    return (
        <div className='flex flex-row items-center gap-4 w-full justify-between'>

            {isBrowsePage ? <div className='hidden md:block'><Search /></div> : <div></div>}
            <div className='flex flex-row items-center gap-4 '>
                {(isTeacherPage || isBrowsePage || isStudentPage) ? <Button variant={'ghost'} onClick={onExit} className='text-md font-bold'>
                    <LogOut className='w-4 h-4 mr-2' />
                    Exit
                </Button> : <Button variant={'ghost'} onClick={onOpenTeacher} className='text-md font-bold'>
                    <Book className='w-4 h-4 mr-2' />
                    Teacher mode
                </Button>}

                <UserButton afterSignOutUrl='/' />
            </div>
        </div >
    )
}

export default NavbarRoutes