import Stripe from "stripe";
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";


export async function POST(req: Request) {

    const { user } = auth()

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
        if (!session?.metadata?.userId || !session?.metadata?.courseId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }
        await stripe?.coupons?.del(`first_buy_${session?.metadata?.userId}`)
        await db.purchases.create({
            data: {
                courseId: session?.metadata?.courseId!,
                userId: session?.metadata?.userId!,
            }
        })

        await db.student.create({
            data: {
                // FIX EMAIL
                name: session?.customer_details?.name!,
                image_url: session?.metadata?.image_url,
                courses: {
                    create: [
                        {
                            course: {
                                connect: {
                                    id: session?.metadata?.courseId
                                }
                            }
                        }
                    ]
                }
            }
        })


    } else {
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }

    return new NextResponse(null, { status: 200 })

}