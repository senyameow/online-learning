"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Action } from "./Action"
import { Category, Color, Image, Size } from "@prisma/client"

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
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: (table) => <span>${(table.row.original.price + '')}</span>
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: (table) => {
            <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: table.row.original.color }} />
            </div>
        }
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
