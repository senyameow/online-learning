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




        if (!user || !user.id) return new NextResponse(`Unauthorized`, { status: 400 })

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

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!stripeCustomer) {
            const first_buy = await stripe.coupons.create({
                id: `first_buy_${user.id}`,
                percent_off: 66,
                duration: 'once',
            })
            const customer = await stripe.customers.create({
                coupon: first_buy.id,
                email: user?.emailAddresses[0].emailAddress,

            })

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                }
            })
        }





        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}/chapters/${chapterId}?success=123`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}/chapters/${chapterId}?canceled=123`,
            phone_number_collection: {
                enabled: true
            },
            billing_address_collection: 'required',
            metadata: {
                courseId,
                userId: user.id,
            },
            discounts: [
                { coupon: `first_buy_${user.id}` }
            ]
        })

        return NextResponse.json({ url: session.url })

    } catch (error) {
        console.log(error)
        return new NextResponse(`something went wrong`, { status: 500 })
    }
}