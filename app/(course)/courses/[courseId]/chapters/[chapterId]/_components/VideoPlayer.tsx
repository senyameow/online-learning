'use client'

import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

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

    console.log(playbackId)


    return (
        <div className='relative aspect-video'>
            {!isReady && <div className='absolute bg-slate-800 inset-0 flex items-center justify-center'>
                <Loader2 className='w-8 h-8 animate-spin' />
            </div>}

            <MuxPlayer className={cn(``, !isReady && 'hidden')} playbackId={playbackId} title={title} onEnded={() => { }} autoPlay onCanPlay={() => setIsReady(true)} />

        </div>
    )
}

export default VideoPlayer