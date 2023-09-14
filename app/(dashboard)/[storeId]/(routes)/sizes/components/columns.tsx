"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Action } from "./Action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizesColumn = {
    id: string
    label: string
    value: string
    created_at: string
}

export const columns: ColumnDef<SizesColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        id: 'actions',
        cell: (table) => <Action size={table.row.original} />
    }

]
