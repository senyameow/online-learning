'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { id } from 'date-fns/locale';

interface SidebarRouteProps {
    href: string;
    title: string;
    icon: any;
}

const SidebarRoute = ({ href, title, icon }: SidebarRouteProps) => {

    const pathname = usePathname()

    const active = pathname?.includes(href)

    const Icon = icon

    return (
        <Link href={href} className={cn(`w-full hover:bg-gray-100`, active && 'bg-blue-200 border-r-[3px]  border-blue-700 text-blue-500')}>
            <div className='p-4 flex flex-row justify-start items-center text-sm text-gray-600'>
                <Icon className={'w-8 h-8 mr-4'} />
                <span className='text-muted-forehead text-xl'>{title}</span>
            </div>
        </Link>
    )
}

export default SidebarRoute