'use client'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Back = () => {

    const router = useRouter()

    return (
        <Button variant={'ghost'} className='flex items-center' onClick={() => {
            router.back()
        }}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to course setup
        </Button>
    )
}

export default Back