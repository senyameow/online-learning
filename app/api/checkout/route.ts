import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
    try {
        const user = await currentUser()

        if (!user || !user.id || user.emailAddresses) return new NextResponse(`Unauthorized`, { status: 400 })

        const { courseId, chapterId } = await req.json()
        if (!courseId) return new NextResponse(`No course ID provided`, { status: 401 })

        // const purchasedCourse = await db.course.findFirst({
        //     where: {
        //         id: courseId
        //     }
        // })

        const purchasedCourse = await db.course.findUnique({
            where: {
                id: courseId
            }
        })

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            price_data: {
                currency: 'USD',
                product_data: {
                    name: purchasedCourse?.title!
                },
                unit_amount: Number(purchasedCourse?.price) * 100
            },
            quantity: 1,
        }]

        // const stripeCustomer = await 

        const oldPurchase = await db.purchases.findFirst({
            where: {
                AND: {
                    userId: user.id,
                    courseId
                }
            }
        })

        if (!oldPurchase) {
            const purchase = await db.purchases.create({
                data: {
                    userId: user.id,
                    courseId
                }
            })
        }



        const session = await stripe.checkout.sessions.create({
            customer: user.id,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `/courses/${courseId}/chapters/${chapterId}?success=123`,
            cancel_url: `/courses/${courseId}/chapters/${chapterId}?canceled=123`,
            phone_number_collection: {
                enabled: true
            },
            billing_address_collection: 'required',
        })

        return NextResponse.json({ url: session.url })

    } catch (error) {
        console.log(error)
        return new NextResponse(`something went wrong`, { status: 500 })
    }
}