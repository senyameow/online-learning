'use client'
import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { useModalStore } from '@/hooks/use-modal-store'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DeleteConversationModal = () => {

    const { isOpen, type, onClose, data } = useModalStore()

    const isModalOpen = type === 'deleteConversation' && isOpen

    const conversationId = data?.conversationId

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/conversations/${conversationId}`)
            router.refresh()
            onClose()
            router.push('/conversations')
            toast.success(`you've successfully deleted conversation`)

        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Modal isOpen={isModalOpen} onClose={() => onClose()} title='Are You sure about deleting this chat?' description='you will not be able to restore it later'>

            <DialogFooter className='w-full  bg-white'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <Button variant={'ghost'} disabled={isLoading} onClick={() => onClose()} className='bg-transparent text-white hover:text-white hover:bg-indigo-500/90 font-bold bg-indigo-500'>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onDelete} className='text-white hover:text-white hover:bg-rose-500/90 font-bold bg-rose-500'>
                        {isLoading ? <Loader2 className='animate-spin w-4 h-4' /> : 'Delete'}
                    </Button>
                </div>
            </DialogFooter>
        </Modal>
    )
}

export default DeleteConversationModal