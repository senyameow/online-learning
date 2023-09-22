"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { FileIcon, Video } from "lucide-react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
    value?: string;
};

export const FileUpload = ({
    onChange,
    endpoint,
    value,
}: FileUploadProps) => {

    const fileType = value?.split('.').pop()

    if (endpoint === 'courseFiles' && value) {
        return (
            <div className="w-full h-[100px] bg-blue-100">
                <div className="flex items-center justify-center px-4 py-2 relative">
                    <FileIcon />
                    <a href={value} className='' target='_blank' rel='noopener noreferrer'></a>
                </div>
            </div>
        )
    }


    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    )
}