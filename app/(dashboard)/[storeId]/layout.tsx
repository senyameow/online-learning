import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from 'next/navigation'
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";


export default async function DashboardLayout({ params, children }: { params: { storeId: string }, children: React.ReactNode }) {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}