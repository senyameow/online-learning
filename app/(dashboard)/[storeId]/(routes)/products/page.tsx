import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import ProductClient from "./components/Client"
import { ProductColumn } from "./components/columns"

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

    const products = await db.product.findMany({
        where: {
            storeId: store.id,
        }
    })

    const formattedBillboards: ProductColumn[] = products.map(product => ({
        id: product.id,
        label: product.label,
        colorId: product.colorId,
        sizeId: product.sizeId,
        created_at: format(product.created_at, 'MMMM do, yyyy'),
    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductClient items={formattedBillboards} />
            </div>
        </div>
    )
}

export default BillboardPage
