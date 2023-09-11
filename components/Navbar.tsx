import React from 'react'
import { Select } from './ui/select'
import { UserButton } from '@clerk/nextjs'
import MainNav from './MainNav'

const Navbar = () => {
    return (
        <div className='flex items-center h-16 px-4 border-b '>
            <div className=''>
                switcher
            </div>
            <MainNav className='mx-8' />
            <div className='flex flex-row items-center gap-[10px] ml-auto'>
                <span>mode</span>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar