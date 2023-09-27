'use client'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface NextChapterButtonProps {
    nextChapterId: string;
    isCompleted: boolean | undefined;
    courseId: string;
    chapterId: string;
    userId: string;
    chapterTitle: string;
}

const NextChapterButton = ({ nextChapterId, isCompleted, courseId, chapterId, chapterTitle }: NextChapterButtonProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    console.log(isCompleted)

    console.log(nextChapterId)
    console.log(courseId)
    const { onOpen } = useConfettiStore()


    const onClick = async () => {


        try {
            setIsLoading(true)
            if (!nextChapterId && !isLoading) {
                onOpen()
                router.push(`/browse`)
            }
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/finish`)
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            router.refresh()
            toast.success(`you've completed ${chapterTitle}`)
        } catch (error) {
            toast.error(`something went wrong`)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onNext = () => {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
    }



    return (
        <>
            {!isCompleted ? <Button onClick={onClick} disabled={isLoading}>Finish</Button> : <Button disabled={isLoading || !nextChapterId} onClick={onNext} className={cn(``, !nextChapterId && 'hidden')}>
                <span>Next <ArrowRight className='w-4 h-4 ml-2' /></span>
            </Button>}
            {!nextChapterId && (
                <Button>
                    Donate
                </Button>
            )}
        </>
    )
}

export default NextChapterButton