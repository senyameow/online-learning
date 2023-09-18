import Stripe from "stripe";
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";


export default async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SECRET_KEY as string)

    } catch (error: any) {
        return new NextResponse(`webhook error: ${error.message}`, { status: 400 })

    }

    const session = event.data.object as Stripe.Checkout.Session
    const address = session?.customer_details?.address

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.country,
        address?.state,
        address?.postal_code,
    ]

    const addressToString = addressComponents.filter(line => line !== null).join(', ')

    if (event.type === 'checkout.session.completed') {
        const order = await db.order.update({
            where: {
                id: session.metadata?.orderId // вот и метадата пригодилась нам!
            },
            data: {
                paid: true,
                address: addressToString,
                phone: session.customer_details?.phone as string || '',
            },
            include: {
                OrderItem: true // включаем чтобы получить их айдишники => чтобы изменить табличку продуктов => состояние isFeatured или isArchived
            }
        })

        const productIds = order.OrderItem.map(item => item.id) // состовляем списочек из айдишников, чтобы заюзать in, чтобы пройтись по всем айдишникам и у всех поменять все

        await db.product.updateMany({
            where: {
                id: {
                    in: productIds
                }
            },
            data: {
                isArchived: true
            }
        })

        return new NextResponse(null, { status: 200 })

    }


}