import { db } from "@/lib/db"


const getMonthlyRevenue = async (id: string) => {

    function getMonthName(monthNumber: number) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'short' });
    }

    const paidOrders = await db.order.findMany({
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

    const data: { name: string, total: number }[] =
        [
            { name: 'Jan', total: 0 },
            { name: 'Feb', total: 0 },
            { name: 'Mar', total: 0 },
            { name: 'Apr', total: 0 },
            { name: 'May', total: 0 },
            { name: 'Jun', total: 0 },
            { name: 'Jul', total: 0 },
            { name: 'Aug', total: 0 },
            { name: 'Sep', total: 0 },
            { name: 'Oct', total: 0 },
            { name: 'Nov', total: 0 },
            { name: 'Dec', total: 0 },
        ]

    for (const order of paidOrders) {

        const month = getMonthName(order.created_at.getMonth())
        let total = 0

        for (const item of order.OrderItem) {
            total += Number(item.Product.price)
        }

        data.forEach(obj => {
            if (obj.name === month) {
                obj.total = total
            }
        })
    }

    return data
}

export default getMonthlyRevenue