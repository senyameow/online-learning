import React from 'react'

interface ChapterCardProps {
    title: string;
    id: string;
}

const ChapterCard = ({ title, id }: ChapterCardProps) => {
    return (
        <div className='w-full border py-2'>
            {title}
        </div>
    )
}

export default ChapterCard