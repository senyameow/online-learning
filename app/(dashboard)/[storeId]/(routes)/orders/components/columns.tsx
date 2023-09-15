"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersColumn = {
    id: string
    phone: string;
    address: string;
    total: string;
    paid: boolean;
    products: string;
    created_at: string;
}

export const columns: ColumnDef<OrdersColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: 'total',
        header: 'Total price'
    },
    {
        accessorKey: 'paid',
        header: 'Paid',
        cell: (table) => <span>{table.row.original.paid === false ? <X className="w-6 h-6 text-rose-500" /> : <Check className="w-6 h-6 text-green-500" />}</span>
    }


]
