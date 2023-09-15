import StoreSettings from "@/components/StoreSettings"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { format } from 'date-fns'
import { formatter } from "@/lib/utils"
import OrderClient from "./components/Client"
import { OrdersColumn } from "./components/columns"

interface OrderPageProps {
    params: {
        storeId: string
    }
}

const OrdersPage = async ({ params }: OrderPageProps) => {
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

    const orders = await db.order.findMany({
        where: {
            storeId: store.id,
        },
        include: {
            OrderItem: {
                include: {
                    Product: true
                }
            }
        }
    })

    const formattedOrders: OrdersColumn[] = orders.map(order => ({
        id: order.id,
        phone: order.phone,
        paid: order.paid,
        address: order.address,
        products: order.OrderItem.map(item => item.Product.label).join(', '),
        total: formatter.format(order.OrderItem.reduce((acc, item) => acc + Number(item.Product.price), 0)),
        created_at: format(order.created_at, 'MMMM do, yyyy'),

    }))



    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <OrderClient items={formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage
