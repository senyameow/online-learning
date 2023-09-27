import Stripe from "stripe";
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";


export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.WEBHOOK_SECRET!)

    } catch (error: any) {
        return new NextResponse(`webhook error: ${error.message}`, { status: 400 })

    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        await stripe.coupons.del(`first_buy_${session?.metadata?.userId}`)
        const purchase = await db.purchases.create({
            data: {
                courseId: session.metadata?.courseId!,
                userId: session.metadata?.userId!
            }
        })

        return new NextResponse(null, { status: 200 })

    }


}