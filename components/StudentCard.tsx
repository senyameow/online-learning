import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';

interface StudentCardProps {
    name: string;
    image_url: string;
    id: string;
    date: string;
}

const StudentCard = ({ name, id, image_url, date }: StudentCardProps) => {
    return (
        <div className='w-full rounded-lg border border-black p-4 hover:cursor-pointer group'>
            <div className='flex items-center gap-2 justify-between'>
                <div className='flex items-center gap-4'>
                    <Image src={image_url} alt='avatar' width={50} height={50} className='rounded-full ' />
                    <div className='flex flex-col justify-between items-start'>
                        <span className='text-lg font-bold'>{name}</span>
                        <span className='text-sm text-neutral-500'>student since {date}</span>
                    </div>
                </div>
                <Button className='hidden group-hover:block' variant={'ghost'}>
                    <MessageCircle className='w-6 h-6 ' />
                </Button>
            </div>
        </div>
    )
}

export default StudentCard