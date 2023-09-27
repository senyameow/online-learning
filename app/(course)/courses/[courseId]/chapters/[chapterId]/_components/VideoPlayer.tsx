'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface VideoPlayerProps {
    title: string;
    chapterId: string;
    playbackId: string;
    completeOnEnd: boolean;
    courseId: string;
    nextChapterId: string;
}

const VideoPlayer = ({ title, chapterId, playbackId, completeOnEnd, courseId, nextChapterId }: VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false)

    const { onOpen } = useConfettiStore()
    const router = useRouter()

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                if (!nextChapterId) {
                    onOpen()
                } else {
                    await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/finish`)
                    router.push(`/courses/${courseId}/chapters/${chapterId}`)
                    router.refresh()
                }
            }
        } catch (error) {
            toast.error(`something went wrong`)
        }
    }

    return (
        <div className='relative aspect-video'>
            {!isReady && <div className='absolute bg-slate-800 inset-0 flex items-center justify-center'>
                <Loader2 className='w-8 h-8 animate-spin' />
            </div>}

            <MuxPlayer className={cn(``, !isReady && 'hidden')} playbackId={playbackId} title={title} onEnded={onEnd} autoPlay onCanPlay={() => setIsReady(true)} />

        </div>
    )
}

export default VideoPlayer