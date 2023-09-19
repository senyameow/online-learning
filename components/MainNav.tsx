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
            href: `/${params.storeId}/`,
            active: pathname === `/${params.storeId}/`
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
            label: 'Products',
            href: `/${params.storeId}/products`,
            active: pathname === `/${params.storeId}/products`
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
            label: 'Orders',
            href: `/${params.storeId}/orders`,
            active: pathname === `/${params.storeId}/orders`
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