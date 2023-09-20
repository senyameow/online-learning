

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export default async function PATCH(req: Request) {
    try {
        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })



    } catch (error) {

    }
}