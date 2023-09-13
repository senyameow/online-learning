'use client'
import React from 'react'
import Heading from '@/components/Heading'
import { Billboard } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useModalStore } from '@/hooks/use-modal-store'
import { useParams } from 'next/navigation'
import { DataTable } from '@/components/ui/DataTable'
import { ApiList } from '@/components/ApiList'
import { columns } from './columns'
import { CategoryColumn } from './columns'


interface CategoryClientProps {
    items: CategoryColumn[];
}

const CategoryClient = ({ items }: CategoryClientProps) => {

    const params = useParams()

    const { onOpen } = useModalStore()

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Categories (${items.length})`} description='Create category for Your store' />
                <Button onClick={() => onOpen('createCategory', { storeId: params?.storeId as string })} className='flex items-center'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={items} />
            <Separator />
            <Heading title='api' description='api calls for categories' />
            <Separator />
            <ApiList name='categories' idName='categoryId' />
        </>
    )
}

export default CategoryClient