'use client'

import React from "react"
import { ApiAlert } from "./ApiAlert";
import { useParams } from "next/navigation";

interface ApiListProps {
    name: string;
    idName: string;
}

export const ApiList = ({ name, idName }: ApiListProps) => {

    const params = useParams()

    const baseUrl = `${origin}/api/${name}`

    return (
        <>
            <ApiAlert title="GET" description={`${baseUrl}/?storeId=${params.storeId}`} variant="public" />
            <ApiAlert title="GET" description={`${baseUrl}/<${idName}>/get/?storeId=${params.storeId}`} variant="public" />
            <ApiAlert title="POST" description={`${baseUrl}/?storeId=${params.storeId}`} variant="admin" />
            <ApiAlert title="PATCH" description={`${baseUrl}/<${idName}>/change`} variant="admin" />
            <ApiAlert title="DELETE" description={`${baseUrl}/<${idName}>/delete`} variant="admin" />

        </>
    )
}