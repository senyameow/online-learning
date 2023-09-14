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
            label: 'Overview',
            href: `/${params.storeId}/overview`,
            active: pathname === `/${params.storeId}/overview`
        },

        {
            label: 'Categories',
            href: `/${params.storeId}/categories`,
            active: pathname === `/${params.storeId}/categories`
        },
        {
            label: 'Billboards',
            href: `/${params.storeId}/billboards`,
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            label: 'Sizes',
            href: `/${params.storeId}/sizes`,
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            label: 'Colors',
            href: `/${params.storeId}/colors`,
            active: pathname === `/${params.storeId}/colors`
        },
        {
            label: 'Settings',
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