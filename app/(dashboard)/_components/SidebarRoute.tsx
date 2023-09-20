'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface SidebarRouteProps {
    href: string;
    title: string;
    icon: any;
}

const SidebarRoute = ({ href, title, icon }: SidebarRouteProps) => {

    const pathname = usePathname()

    const active = (pathname === href) || (pathname.startsWith(`${href}/`))

    const Icon = icon

    return (
        <Link href={href} className={cn(`w-full hover:bg-blue-100/80`, active && 'bg-blue-200 border-r-[3px]  border-blue-700 text-blue-500')}>
            <div className='p-6 flex flex-row justify-start items-center text-sm'>
                <Icon className={'w-6 h-6 mr-2'} />
                <span className='text-muted-forehead text-[18px]'>{title}</span>
            </div>
        </Link>
    )
}

export default SidebarRoute