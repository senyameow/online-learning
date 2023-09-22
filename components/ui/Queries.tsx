import { Category } from '@prisma/client'
import React from 'react'
import { Toggle } from './toggle'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Query from './Query'

interface QueriesProps {
    data: Category[];
    valueKey: string
}

const Queries = ({ data, valueKey }: QueriesProps) => {
    return (
        <div className='flex flex-wrap items-center gap-4 w-full my-4'>
            {data.map(item => (
                <Query valueKey={valueKey} key={item.id} item={item} />
            ))}
        </div>
    )
}

export default Queries