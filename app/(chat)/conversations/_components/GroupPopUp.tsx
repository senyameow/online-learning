'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useModalStore } from '@/hooks/use-modal-store'
import { Edit, MoreHorizontal, School, Trash, Users } from 'lucide-react'
import React, { useState } from 'react'

const GroupPopUp = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { onOpen, data } = useModalStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading}>
                <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-12 z-999'>

                <DropdownMenuItem disabled={isLoading} onClick={() => onOpen('deleteConversation', {})}>
                    <div className="flex flex-row items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Update
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLoading} onClick={() => onOpen('deleteConversation', {})}>
                    <div className="flex flex-row items-center">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GroupPopUp