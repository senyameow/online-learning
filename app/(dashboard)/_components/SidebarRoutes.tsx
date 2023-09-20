'use client'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { BarChart, Compass, Layout, List, Moon } from 'lucide-react'
import SidebarRoute from './SidebarRoute'



const SidebarRoutes = () => {

    const params = useParams()
    const pathname = usePathname()


    const guestRoutes = [
        {
            label: 'Dashboard',
            icon: Layout,
            href: `/`,
        },
        {
            label: 'Browse',
            icon: Compass,
            href: `/browse`,
        },
    ]
    const teacherRoutes = [
        {
            label: 'Courses',
            icon: List,
            href: `/teacher/courses`,
        },
        {
            label: 'Analytics',
            icon: BarChart,
            href: `/teacher/analytics`,
        },
    ]

    let routes

    pathname.startsWith('/teacher') ? routes = teacherRoutes : routes = guestRoutes

    return (
        <div className='w-full flex flex-col'>
            {routes.map(route => (
                <SidebarRoute key={route.href} href={route.href} title={route.label} icon={route.icon} />
            ))}
        </div>
    )
}

export default SidebarRoutes