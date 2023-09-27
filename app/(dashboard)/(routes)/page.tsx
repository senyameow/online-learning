import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { format } from 'date-fns'
import CoursesClient from './teacher/_components/Client'
import { formatter } from '@/lib/utils'
import { CoursesColumn } from './teacher/_components/columns'
import axios from 'axios'

const CoursePage = async () => {

    const { userId } = auth()

    if (!userId) return redirect('/sign-in')

    return (
        <div>teacher</div>
    )
}

export default CoursePage