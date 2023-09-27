'use client'
import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Course } from '@prisma/client'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

const Enroll = ({ price, courseId }: { price: number, courseId: string }) => {

    const onCkeckout = async () => {
        try {
            const res = await axios.post(`/api/checkout`, { courseId: courseId })
            window.location = res.data.url
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <Button onClick={onCkeckout} className='w-full md:w-fit'>
            Enroll for {formatter.format(Number(price))}
        </Button>
    )
}

export default Enroll