import { Sidebar } from 'lucide-react'
import React from 'react'
import Navbar from '../(dashboard)/_components/Navbar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='h-20 flex inset-y-0 fixed z-50 border w-full md:pl-56'>
                <Navbar />
            </div>
            <div className='hidden md:flex inset-y-0 fixed w-56 z-50'>
                <Sidebar />
            </div>
            <div className='md:pl-56 md:pt-20 h-full'>
                {children}
            </div>
        </div>
    )
}

export default Dashboard