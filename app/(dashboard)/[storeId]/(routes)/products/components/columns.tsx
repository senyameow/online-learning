"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Action } from "./Action"
import { Category, Color, Image, Size } from "@prisma/client"
import { Check, X } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
    id: string
    label: string
    price: string;
    isFeatured: boolean;
    isArchived: boolean;

    category: Category;
    size: Size;
    color: string;

    created_at: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "label",
        header: "Name",
    },
    {
        accessorKey: "isArchieved",
        header: "Archieved",
        cell: (table) => <span className="">{table.row.original.isArchived === false ? <X className="w-6 h-6 text-rose-500" /> : <Check className="w-6 h-6 text-green-500" />}</span>
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
        cell: (table) => <span>{table.row.original.isFeatured === false ? <X className="w-6 h-6 text-rose-500" /> : <Check className="w-6 h-6 text-green-500" />}</span>
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: (table) => <span>{(table.row.original.price + '')}</span>
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: (table) => <span>{table.row.original.category.label}</span>
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: (table) => <span>{table.row.original.size.value}</span>
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: (table) => (
            <div className="flex items-center gap-2 w-6 h-6">
                <div className={`w-6 h-6 rounded-full border border-black`} style={{ backgroundColor: table.row.original.color }} />
            </div>
        )
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        id: 'actions',
        cell: (table) => <Action product={table.row.original} />
    }

]
