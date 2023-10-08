import { Ghost, LucideIcon } from 'lucide-react'
import React from 'react'

interface EmptyStateProps {
    icon?: LucideIcon;
    text?: string
}

const EmptyState = ({ icon = Ghost, text = 'Oooops... Only ghost here' }: EmptyStateProps) => {
    const Icon = icon
    return (
        <div className='h-full w-full flex flex-col items-center justify-center text-center'>
            <Icon className='h-6 w-6 animate-bounce' />
            <span className='italic text-sm '>{text}</span>
        </div>
    )
}

export default EmptyState