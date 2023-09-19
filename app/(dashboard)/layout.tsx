import React from 'react'
import Sidebar from './_components/Sidebar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='hidden md:flex inset-y-0 fixed w-56 z-50'>
                <Sidebar />
            </div>
            {children}
        </div>
    )
}

export default Dashboard