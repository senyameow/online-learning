'use client'
import React from 'react'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useModalStore } from '@/hooks/use-modal-store'
import { useParams } from 'next/navigation'
import { DataTable } from '@/components/ui/DataTable'
import { ApiList } from '@/components/ApiList'
import { ProductColumn } from './columns'
import { columns } from './columns'
import { Category, Color, Size } from '@prisma/client'
interface ProductClientProps {
    items: ProductColumn[];
    colors: Color[];
    sizes: Size[];
    categories: Category[];
}

const ProductClient = ({ items, colors, sizes, categories }: ProductClientProps) => {

    const params = useParams()

    const { onOpen } = useModalStore()


    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Products (${items.length})`} description='Create as many products as You want' />
                <Button onClick={() => onOpen('createProduct-1', { storeId: params?.storeId as string, colors, sizes, categories })} className='flex items-center'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={items} />
            <Separator />
            <Heading title='api' description='api calls for products' />
            <Separator />
            <ApiList name='products' idName='productId' />
        </>
    )
}

export default ProductClient