'use client'
import React from 'react'
import Heading from '../Heading'
import { Billboard } from '@prisma/client'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '../ui/separator'
import { useModalStore } from '@/hooks/use-modal-store'
import { useParams } from 'next/navigation'
import { DataTable } from '../ui/DataTable'
import { BillboardColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns'

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
        </>
    )
}

export default BillboardClient