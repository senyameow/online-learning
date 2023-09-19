import { db } from "@/lib/db"


const getTotalProducts = async (id: string): Promise<number> => {

    const res = await db.product.findMany({
        where: {
            storeId: id,
            isArchived: false
        }
    })

    return res.length

}

export default getTotalProducts