import { db } from "@/lib/db"


export async function getSales(userId: string): Promise<number> {
    let sales: number = 0
    try {
        const res = await db.purchases.findMany({
            where: {
                Course: {
                    userId
                }
            }
        })

        sales = res.length

    } catch (error) {
        console.log(error)
    }
    return sales

}