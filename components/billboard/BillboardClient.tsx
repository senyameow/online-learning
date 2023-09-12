'use client'
import React from 'react'
import Heading from '../Heading'
import { Billboard } from '@prisma/client'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '../ui/separator'
import { useModalStore } from '@/hooks/use-modal-store'

interface BillboardClientProps {
    items: Billboard[]
}

const BillboardClient = ({ items }: BillboardClientProps) => {

    const { onOpen } = useModalStore()

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Billboards (${items.length})`} description='Create billboards for Your store' />
                <Button onClick={() => onOpen('createBillboard')} className='flex items-center'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}

export default BillboardClient