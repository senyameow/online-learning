'use client'
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MiniStudentCardProps {
    name: string;
    image_url: string;
    id: string;
}

const MiniStudentCard = ({ name, id, image_url }: MiniStudentCardProps) => {

    const router = useRouter()

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
                    <Button variant={'ghost'} className='opacity-0 group-hover:opacity-100 transition' onClick={() => router.push(`/conversaions/${id}`)}>
                        <MessageCircle className='w-5 h-5' />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default MiniStudentCard