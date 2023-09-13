"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CategoryAction } from "./Action"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
    id: string
    label: string
    billboardName: string
    created_at: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "label",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: (table) => table.row.original.billboardName
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        id: 'actions',
        cell: (table) => <CategoryAction category={table.row.original} />
    }

]
