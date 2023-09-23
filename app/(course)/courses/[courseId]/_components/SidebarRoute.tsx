'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { id } from 'date-fns/locale';

interface SidebarRouteProps {
    href: string;
    title: string;
    icon: any;
    isLocked: boolean;
}

const SidebarRoute = ({ href, title, icon, isLocked }: SidebarRouteProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const active = pathname?.includes(href)

    const onClick = () => {
        router.push(href)
    }

    const Icon = icon

    return (
        <button onClick={onClick} disabled={isLocked} className={cn(`w-full hover:bg-gray-100`, active && 'bg-blue-200 border-r-[3px]  border-blue-700 text-blue-500', isLocked && 'cursor-not-allowed')}>
            <div className='p-4 flex flex-row justify-start items-center text-sm text-gray-600'>
                <Icon className={'w-8 h-8 mr-4'} />
                <span className='text-muted-forehead text-xl'>{title}</span>
            </div>
        </button>
    )
}

export default SidebarRoute