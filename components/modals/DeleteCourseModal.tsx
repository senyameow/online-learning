'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { useModalStore } from '@/hooks/use-modal-store'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteCourse = () => {
    const router = useRouter()

    const { type, data, onClose, isOpen } = useModalStore()

    const isModalOpen = type === 'DeleteCourse' && isOpen


    const courseInfo = data?.courseInfo



    const [isLoading, setIsLoading] = useState(false)

    const onDelete = async () => {
        try {
            setIsLoading(true)
            console.log(data)

            await axios.delete(`/api/courses/${courseInfo?.courseId}`)
            router.refresh()
            router.push(`/teacher/courses`)
            toast.success('chater was successfully deleted')

        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}> {/* сделаем его по дефолту открытым */}
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6 flex flex-col gap-3 items-center justify-center'>
                    <DialogTitle className='text-2xl font-bold text-center'>
                        Delete Course
                    </DialogTitle>
                    <DialogDescription>
                        Are You Sure You Want To Delete <span className='text-md text-black font-bold'>Course</span>{` `} <span> </span>
                        <span className='text-indigo-500 font-semibold'>{courseInfo?.courseTitle}</span>
                    </DialogDescription>

                </DialogHeader>

                <DialogFooter className='w-full  bg-gray-100 px-6 py-4'>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <Button variant={'ghost'} onClick={() => onClose()} className='bg-transparent hover:bg-transparent'>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onDelete} className='text-white hover:text-white hover:bg-indigo-500/90 font-bold bg-indigo-500'>
                            Delete
                        </Button>
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default DeleteCourse