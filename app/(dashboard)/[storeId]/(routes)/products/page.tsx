import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import ProductClient from "./components/Client"
import { ProductColumn } from "./components/columns"
import { formatter } from "@/lib/utils"

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
        },
        include: {
            Category: true,
            Size: true,
            Color: true,
        }, // мы указывали связи по айдишникам, он просто теперь сможет пойти и подтянуть к нам строчки из этих таблиц по айдишникам
        // т.е. у нас нет Category или Color или Size в табличке с продуктами, у нас только айдишники для них
        // а цвета размеры и категории нам нужны для таблицы, следовательно вот так
        orderBy: {
            created_at: 'desc'
        }
    })

    const formattedProducts: ProductColumn[] = products.map(product => ({
        id: product.id,
        label: product.label,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: formatter.format(product.price.toNumber()),
        category: product.Category,
        size: product.Size,
        color: product.Color.value,
        created_at: format(product.created_at, 'MMMM do, yyyy'),
    }))

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductClient items={formattedProducts} colors={colors} sizes={sizes} categories={categories} />
            </div>
        </div>
    )
}

export default BillboardPage
