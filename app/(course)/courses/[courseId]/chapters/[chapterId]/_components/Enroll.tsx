'use client'
import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Course } from '@prisma/client'
import React from 'react'

const Enroll = ({ price }: { price: number }) => {
    return (
        <Button onClick={() => { }} className='w-full md:w-fit'>
            Enroll for {formatter.format(Number(price))}
        </Button>
    )
}

export default Enroll