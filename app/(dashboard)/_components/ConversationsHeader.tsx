'use client'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/hooks/use-modal-store'
import { UserPlus2 } from 'lucide-react'
import React from 'react'

const ConversationsHeader = ({ }) => {

    const { onOpen } = useModalStore()

    return (
        <div className='w-full flex items-center justify-between pb-4 px-6 pt-6 mx-auto gap-2'>
            <h2 className='font-bold text-2xl'>Conversations</h2>
            <Button onClick={() => onOpen('CreateGroup', {})} className='rounded-full bg-gray-100 py-4 px-3 hover:opacity-80' variant={'ghost'}>
                <UserPlus2 className='w-5 h-5' />
            </Button>
        </div>
    )
}

export default ConversationsHeader