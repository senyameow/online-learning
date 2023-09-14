"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Action } from "./Action"
import { Image } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
    id: string
    label: string
    colorId: string[];
    sizeId: string[];
    price: Number;

    created_at: string
}

export const columns: ColumnDef<ProductColumn>[] = [
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
        cell: (table) => <Action product={table.row.original} />
    }

]
