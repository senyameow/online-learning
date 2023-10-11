import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const page = async () => {

    const { userId } = auth()

    const initialConversation = await db.conversation.findFirst({
        where: {
            students: {
                some: {
                    id: userId as string
                }
            }
        }
    })

    if (initialConversation) return redirect(`/conversations/${initialConversation?.id}`)

    return (
        null
    )
}

export default page