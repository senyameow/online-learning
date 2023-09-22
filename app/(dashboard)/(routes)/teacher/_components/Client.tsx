'use client'
import { DataTable } from '@/components/ui/DataTable'
import React from 'react'
import { CoursesColumn, columns } from './columns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface CoursesClientProps {
    items: CoursesColumn[]
}

const CoursesClient = ({ items }: CoursesClientProps) => {
    return (
        <>

            <DataTable columns={columns} data={items} />
        </>
    )
}

export default CoursesClient