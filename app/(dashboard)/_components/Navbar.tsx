import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavbarRoutes from './NavbarRoutes'
import Search from './Search'
import { getAllStudents } from '@/actions/(chat)/get-other-studets'
const Navbar = async () => {

    const students = await getAllStudents()

    return (
        <nav className='px-4 pb-6 pt-6 bg-white w-full pr-6 shadow-md'>
            <div className='flex items-center justify-between'>
                {/* <Search /> */}
                <MobileSidebar />
                <NavbarRoutes students={students} />
            </div>
        </nav>
    )
}
export default Navbar