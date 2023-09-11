'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            label: 'settings',
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
        {
            label: 'settings',
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
        {
            label: 'settings',
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
    ]

    return (
        <nav className={cn('flex items-center gap-[10px] lg:gap-[15px]', className)}>
            {routes.map(route => (
                <Link key={route.href} href={route.href} className={cn(`text-sm font-[400] hover:text-primary`, route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav