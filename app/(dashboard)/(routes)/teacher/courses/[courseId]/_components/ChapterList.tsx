'use client'
import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

import { cn } from '@/lib/utils';
import ChapterCard from './ChapterCard';


interface ChapterListProps {
    courseId: string;
    items: Chapter[]
    onReorder: (chapter: { id: string, position: number }[]) => void;
}

const ChapterList = ({ items, onReorder, courseId }: ChapterListProps) => {



    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        onReorder(bulkUpdateData);
    }

    if (!isMounted) return null

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='chapters'>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn(`border-0 bg-transparent p-0 w-full`)}
                    >
                        {chapters.map((chapter, ind) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={ind}>
                                {(provided, snapshot) => (
                                    <div className={cn(`mb-3 rounded-md`, snapshot.isDragging && 'bg-sky-400')} ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}

                                    >
                                        <ChapterCard title={chapter.title} id={chapter.id} isPublished={chapter.isPublished!} isFree={chapter.isFree!} courseId={courseId} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ChapterList