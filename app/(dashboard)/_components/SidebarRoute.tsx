import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils';

interface SidebarRouteProps {
    href: string;
    title: string;
    active: boolean;
    icon: any;
}

const SidebarRoute = ({ href, title, active, icon }: SidebarRouteProps) => {

    const Icon = icon

    return (
        <Link href={href} className={cn(`w-full hover:text-blue-100/80`, active && 'bg-blue-200 border-r border-[2.3px] border-blue-700 text-blue-500')}>
            <div className='p-6 flex flex-row justify-start items-center'>
                <Icon className={'w-6 h-6 mr-2'} />
                <span className='text-muted-forehead text-[20px]'>{title}</span>
            </div>
        </Link>
    )
}

export default SidebarRoute