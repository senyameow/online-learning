import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

const Sidebar = () => {
    return (
        <div className='border-r border-neutral-500 h-full w-full flex flex-col bg-white overflow-y-auto shadow-md shadow-blue-400'>
            <div className='p-6'>
                <Logo />
            </div>
            <div className='w-full h-full'>
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default Sidebar