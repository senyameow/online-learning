import React from 'react'
import { Select } from './ui/select'
import { UserButton, auth } from '@clerk/nextjs'
import MainNav from './MainNav'
import Switcher from './Switcher'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ModeToggle } from './ModeToggle'

const Navbar = async () => {

    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await db.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className='flex items-center h-16 px-4 border-b '>
            <Switcher items={stores} />
            <MainNav className='mx-8' />
            <div className='flex flex-row items-center gap-[10px] ml-auto'>
                <ModeToggle />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar