import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavbarRoutes from './NavbarRoutes'
import Search from './Search'
const Navbar = () => {
    return (
        <nav className='px-4 pb-6 pt-6 bg-white w-full pr-6 shadow-sm'>
            <div className='flex items-center justify-between '>
                {/* <Search /> */}
                <MobileSidebar />
                <NavbarRoutes />
            </div>
        </nav>
    )
}
export default Navbar