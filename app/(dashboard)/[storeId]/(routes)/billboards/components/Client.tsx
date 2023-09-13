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
import { BillboardColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns'
import { ApiList } from '@/components/ApiList'
interface BillboardClientProps {
    items: BillboardColumn[];
}

const BillboardClient = ({ items }: BillboardClientProps) => {

    const params = useParams()

    const { onOpen } = useModalStore()

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Billboards (${items.length})`} description='Create billboards for Your store' />
                <Button onClick={() => onOpen('createBillboard', { storeId: params?.storeId as string })} className='flex items-center'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={items} />
            <Separator />
            <Heading title='api' description='api calls for billboards' />
            <Separator />
            <ApiList name='billboards' idName='billboardId' />
        </>
    )
}

export default BillboardClient