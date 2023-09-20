import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Search from './Search'
import MobileSidebar from './MobileSidebar'
const Navbar = () => {
    return (
        <nav className='px-4 pb-6 pt-6 bg-white w-full pr-6 shadow-sm'>
            <div className='flex items-center justify-between '>
                <MobileSidebar />
                <Search />
                <div className='flex flex-row items-center gap-4 '>
                    <button className='text-md font-bold'>
                        Teacher mode
                    </button>
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}

export default Navbar