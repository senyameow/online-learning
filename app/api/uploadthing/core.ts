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

    billboardImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    productImage: f({ image: { maxFileSize: '32MB', maxFileCount: 5 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;