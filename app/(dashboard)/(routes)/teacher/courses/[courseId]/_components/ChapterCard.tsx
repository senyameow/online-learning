'use client'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dot, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ChapterCardProps {
    title: string;
    id: string;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
}

const ChapterCard = ({ title, id, isPublished, isFree, courseId }: ChapterCardProps) => {

    const router = useRouter()

    const onEdit = () => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }

    return (
        <div className={cn(`w-full border bg-gray-200 rounded-md`, isPublished && `bg-sky-400`)}>
            <div className='flex items-center justify-between p-2'>
                <div className='flex items-center gap-3'>
                    <Button variant={'ghost'} className='p-1'><Dot className='w-4 h-4' /></Button>
                    <span className='text-md'>{title}</span>
                </div>
                <div className='flex items-center gap-2 text-white text-sm'>
                    {isFree && <div className='px-2 py-1 rounded-full bg-black  '>Free</div>}
                    {isPublished ? <div className='bg-sky-700 rounded-full px-2 py-1'>Published</div> : <div className='bg-gray-700/40 rounded-full px-2 py-1'>Draft</div>}
                    <Button onClick={onEdit} variant={'ghost'} className='p-2 h-fit text-black'><Pencil className='w-4 h-4' /></Button>
                </div>
            </div>
        </div>
    )
}

export default ChapterCard