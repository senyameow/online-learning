import { db } from "@/lib/db";
import { Course, Purchases } from "@prisma/client";


type PurchaseWithCourse = Purchases & {
    Course: Course
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.Course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += Number(purchase.Course.price!);
    });

    return grouped;
};

export const getData = async (userId: string) => {

    const purchases = await db.purchases.findMany({
        where: {
            Course: {
                userId
            }
        },
        include: {
            Course: true
        }
    })

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
    }));

    return data
}