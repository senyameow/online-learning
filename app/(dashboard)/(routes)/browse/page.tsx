import { db } from '@/lib/db'
import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import Queries from '@/components/ui/Queries'
import Search from '../../_components/Search'

const BrowsePage = async () => {

    const categories = await db.category.findMany()

    return (
        <div className="flex flex-col w-full px-6 h-full">
            <div className='py-4 block md:hidden mt-20'>
                <Search />
            </div>
            <div className='md:mt-0'>
                <Queries data={categories} valueKey='categoryId' />
            </div>
            <div className='flex-1 h-full overflow-y-auto border'>
                qwe
            </div>
        </div>
    )
}

export default BrowsePage