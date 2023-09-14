import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import SizesClient from "./components/Client"
import { ColorsColumn } from "./components/columns"
import ColorsClient from "./components/Client"

interface ColorsPageProps {
    params: {
        storeId: string
    }
}

const ColorsPage = async ({ params }: ColorsPageProps) => {
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

    const colors = await db.color.findMany({
        where: {
            storeId: store.id,
        }
    })

    const formattedColors: ColorsColumn[] = colors.map(color => ({
        id: color.id,
        label: color.label,
        value: color.value,
        created_at: format(color.created_at, 'MMMM do, yyyy'),
    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorsClient items={formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage
