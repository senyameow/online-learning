'use client'
import { Button } from '@/components/ui/button'
import { formatter } from '@/lib/utils'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Enroll = ({ price, courseId, chapterId }: { price: number, courseId: string, chapterId: string }) => {

    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()

    const onCkeckout = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`/api/checkout`, { courseId, chapterId })
            window.location = res.data.url
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('order completed')
        }
        if (searchParams.get('canceled')) {
            toast.error('something went wrong')

        }
    }, [searchParams])

    return (
        <Button disabled={isLoading} onClick={onCkeckout} className='w-full md:w-fit'>
            Enroll for {formatter.format(Number(price))}
        </Button>
    )
}

export default Enroll