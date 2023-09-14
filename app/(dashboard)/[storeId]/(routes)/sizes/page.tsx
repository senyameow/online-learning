import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import SizesClient from "./components/Client"
import { SizesColumn } from "./components/columns"

interface SizesPageProps {
    params: {
        storeId: string
    }
}

const SizesPage = async ({ params }: SizesPageProps) => {
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

    const sizes = await db.size.findMany({
        where: {
            storeId: store.id,
        }
    })

    const formattedSizes: SizesColumn[] = sizes.map(size => ({
        id: size.id,
        label: size.label,
        value: size.value,
        created_at: format(size.created_at, 'MMMM do, yyyy'),
    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <SizesClient items={formattedSizes} />
            </div>
        </div>
    )
}

export default SizesPage
