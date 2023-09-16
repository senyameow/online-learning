'use client'
import React from 'react'
import Heading from '@/components/Heading'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { DataTable } from '@/components/ui/DataTable'
import { OrdersColumn, columns } from './columns'
interface OrderClientProps {
    items: OrdersColumn[];
}

const OrderClient = ({ items }: OrderClientProps) => {



    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Orders (${items.length})`} description='WOW PEOPLE ACTUALLY BUY PRODUCTS' />

            </div>
            <Separator />
            <DataTable columns={columns} data={items} />
            <Separator />
        </>
    )
}

export default OrderClient