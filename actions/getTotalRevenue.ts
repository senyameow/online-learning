import { db } from "@/lib/db"


const getTotalRevenue = async (id: string): Promise<number> => {

    const res = await db.order.findMany({
        where: {
            storeId: id,
            paid: true
        },
        include: {
            OrderItem: {
                include: {
                    Product: true
                }
            }
        }
    })

    return res.reduce((acc, order) => acc + order.OrderItem.reduce((accItem, item) => accItem + Number(item.Product.price), 0), 0)

}

export default getTotalRevenue