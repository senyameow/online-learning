import StoreSettings from "@/components/StoreSettings"
import BillboardClient from "@/components/billboard/BillboardClient"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import { BillboardColumn } from "./components/columns"

interface BillboardPageProps {
    params: {
        storeId: string
    }
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        },
        orderBy: {
            created_at: 'asc'
        }
    })

    if (!store) {
        redirect('/')
    }

    const billboards = await db.billboard.findMany({
        where: {
            storeId: store.id,
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
        id: billboard.id,
        label: billboard.label,
        created_at: format(billboard.created_at, 'MMMM do, yyyy'),
        image_url: billboard.image_url
    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient items={formattedBillboards} />
            </div>
        </div>
    )
}

export default BillboardPage
