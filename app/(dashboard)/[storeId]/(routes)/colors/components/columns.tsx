"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Action } from "./Action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorsColumn = {
    id: string
    label: string
    value: string
    created_at: string
}

export const columns: ColumnDef<ColorsColumn>[] = [
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
        cell: (table) => <Action color={table.row.original} />
    }

]
