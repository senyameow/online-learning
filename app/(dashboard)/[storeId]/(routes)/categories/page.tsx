import StoreSettings from "@/components/StoreSettings"
import BillboardClient from "@/components/billboard/BillboardClient"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import { CategoryColumn } from "./components/columns"
import CategoryClient from "./components/Client"

interface CategoryPageProps {
    params: {
        storeId: string
    }
}

const CategoriesPage = async ({ params }: CategoryPageProps) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }


    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            Billboard: true
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map(category => ({
        id: category.id,
        label: category.label,
        billboardName: category.Billboard.label,
        created_at: format(category.created_at, 'MMMM do, yyyy'),
    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <CategoryClient items={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage
