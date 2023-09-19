import { db } from "@/lib/db"


const getTotalSales = async (id: string): Promise<number> => {

    const res = await db.order.findMany({
        where: {
            storeId: id,
            paid: true
        }
    })

    return res.length

}

export default getTotalSales   