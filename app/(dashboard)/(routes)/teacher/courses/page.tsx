import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='p-8 h-full flex'>
            <Link href={'/teacher/new'} className='ml-auto'>
                <Button className='px-3 '>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Course
                </Button>
            </Link>

        </div>
    )
}

export default page