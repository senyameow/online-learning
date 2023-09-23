import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import { Chapter } from '@prisma/client'

interface SidebarProps {
    chapters: Chapter[];
    title: string;
    isBought: boolean;
}

const Sidebar = ({ chapters, title, isBought }: SidebarProps) => {
    return (
        <div className='border-r border-neutral-500 h-full w-full flex flex-col bg-white overflow-y-auto shadow-md shadow-blue-400'>
            <div className='p-6 text-center text-2xl font-bold text-black border-b border-black'>
                {title}
            </div>
            <div className='w-full h-full'>
                <SidebarRoutes chapters={chapters} isBought={isBought} />
            </div>
        </div>
    )
}

export default Sidebar