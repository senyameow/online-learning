"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Action } from "@/components/billboard/Action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
    id: string
    label: string
    created_at: string
    image_url: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "label",
    },
    {
        accessorKey: "created_at",
        header: "date",
    },
    {
        id: 'actions',
        cell: (table) => <Action billboard={table.row.original} />
    }

]
