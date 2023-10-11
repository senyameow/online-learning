import { pusherServer } from "@/lib/pusher";
import { auth, useSession } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = auth()

    if (!userId) return res.status(401)

    const socketId = req.body.socket_id
    const channel = req.body.channel_name
    const data = {
        user_id: userId as string
    }

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

    return res.send(authResponse)
}