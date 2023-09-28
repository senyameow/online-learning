import { db } from "@/lib/db"


export async function getRevenue(userId: string): Promise<number> {
    let price: number = 0
    try {
        const res = await db.purchases.findMany({
            select: {
                courseId: true
            }
        })
        const boughtCourses = await db.course.findMany({
            where: {
                id: {
                    in: res.map(res => res.courseId)
                },
                userId
            },
            select: {
                price: true
            }
        })
        price = boughtCourses.reduce((acc, { price }) => acc + Number(price), 0)
    } catch (error) {
        console.log(error)
    }
    return price

}