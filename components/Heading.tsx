import React from 'react'

interface HeadingProps {
    title: string;
    description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <span className='font-bold text-4xl'>{title}</span>
            <span className='text-muted-foreground text-sm'>{description}</span>
        </div>
    )
}

export default Heading