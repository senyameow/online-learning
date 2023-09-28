'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { formatter } from '@/lib/utils'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Enroll = ({ price, courseId, chapterId, userId }: { price: number, courseId: string, chapterId: string, userId: string }) => {

    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()

    const router = useRouter()

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
        const createPurchase = async () => {
            try {
                setIsLoading(true)
                // const res = await axios.post(`/api/purchases`, { courseId, userId })
                router.refresh()
                toast.success(`You've purchased course`)
            } catch (error) {
                console.log(error)
                toast.error(`something went wrong BUT IT'S IMPOSSIBLE`)
            } finally {
                setIsLoading(false)
            }

        }
        if (searchParams.get('success')) {
            createPurchase()
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