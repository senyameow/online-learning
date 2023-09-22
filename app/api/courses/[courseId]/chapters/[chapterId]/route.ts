import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Mux from '@mux/mux-node'



export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {

        const { Video } = new Mux(
            process.env.MUX_TOKEN_ID!,
            process.env.MUX_TOKEN_SECRET!
        )

        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const body = await req.json()
        const { isPublished } = body

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId
            },
            data: {
                ...body,
                isPublished: isPublished ? true : undefined
            }
        })

        if (body.video_url) {
            const oldVideo = await db.muxData.findUnique({
                where: {
                    chapterId: chapter.id
                }
            })
            if (oldVideo) {
                await Video.Assets.del(oldVideo.assetId)
                await db.chapter.update({
                    where: {
                        id: params.chapterId,
                    },
                    data: {
                        muxData: body.video_url
                    }
                })
            }

            const asset = await Video.Assets.create({
                input: body.video_url,
                playback_policy: 'public',
                test: false
            })

            await db.muxData.create({
                data: {
                    assetId: asset.id,
                    chapterId: params.chapterId,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        }

        return NextResponse.json(chapter, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse(`internal error`, { status: 500 })
    }
}



export async function DELETE(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {



        const { userId } = auth()

        if (!userId) return new NextResponse(`Unauthorized`, { status: 401 })

        if (!params.courseId) return new NextResponse('No course ID provided', { status: 401 })

        const chapter = await db.chapter.delete({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })



        return NextResponse.json(chapter, { status: 200 })


    } catch (error) {
        console.log(error)
        return new NextResponse(`internal error`, { status: 500 })
    }
}
