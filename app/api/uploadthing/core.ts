import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth()

    if (!userId) throw new Error('unathorized')
    return { userId: userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    courseFiles: f({ image: { maxFileSize: '16MB', maxFileCount: 10 }, pdf: { maxFileSize: '32MB', maxFileCount: 10 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    chapterVideo: f({ image: { maxFileSize: '32MB', maxFileCount: 5 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;