'use client'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { BarChart, Compass, Layout, List, Lock, Moon, Play, PlayCircleIcon } from 'lucide-react'
import SidebarRoute from './SidebarRoute'
import { Chapter } from '@prisma/client'

interface SidebarRoutesProps {
    chapters: Chapter[];
    isBought: boolean;

}

const SidebarRoutes = ({ chapters, isBought }: SidebarRoutesProps) => {

    const params = useParams()

    const routes = chapters.map(chapter => ({
        label: chapter.title,
        href: `/courses/${params?.courseId}/chapters/${chapter.id}`,
        icon: isBought || chapter.isFree ? PlayCircleIcon : Lock,
        isLocked: !isBought && !chapter.isFree,
    }))


    return (
        <div className='w-full flex flex-col'>
            {routes.map(route => (
                <SidebarRoute key={route.href} href={route.href} title={route.label} icon={route.icon} isLocked={route.isLocked} />
            ))}
        </div>
    )
}

export default SidebarRoutes