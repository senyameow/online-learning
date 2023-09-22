import { db } from '@/lib/db'
import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import Queries from '@/components/ui/Queries'

const BrowsePage = async () => {

    const categories = await db.category.findMany()

    return (
        <div className="flex flex-col w-full px-6">
            <Queries data={categories} valueKey='category' />
            <div className='flex-1 border'>
                qwe
            </div>
        </div>
    )
}

export default BrowsePage