import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
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
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <StoreSettings name={store.name} storeId={store.id} />
            </div>
        </div>
    )
}

export default SettingsPage
