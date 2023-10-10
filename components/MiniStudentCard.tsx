'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Loader2, MessageCircle, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useModalStore } from '@/hooks/use-modal-store';
import StudentMore from './StudentMore';

interface MiniStudentCardProps {
    name: string;
    image_url: string;
    id: string;
}

const MiniStudentCard = ({ name, id, image_url }: MiniStudentCardProps) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const { type } = useModalStore()

    const { onClose } = useModalStore()

    const onConversation = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`/api/conversations`, { id })
            toast.success(`you have created conversation`)
            onClose()
            router.push(`/conversations/${res.data.id}`)
        } catch (error) {
            console.log(error)
            toast.error(`something went wrong`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full rounded-lg border border-black p-4 hover:cursor-pointer group'>
            <div className='flex items-center gap-2 justify-between'>
                <div className='flex items-center gap-4'>
                    <Image src={image_url} alt='avatar' width={50} height={50} className='rounded-full ' />
                    <div className='flex flex-col justify-between items-start'>
                        <span className='text-lg font-bold'>{name}</span>
                    </div>
                </div>
                <div>
                    {type === 'UsersModal' ? <Button disabled={isLoading} variant={'ghost'} className='opacity-0 group-hover:opacity-100 transition' onClick={onConversation}>
                        {isLoading ? <Loader2 className='w-5 h-5 animate-spin' /> : <MessageCircle className='w-5 h-5' />}
                    </Button> : (
                        <StudentMore />
                    )}
                </div>

            </div>
        </div>
    )
}

export default MiniStudentCard