import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./Action";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StudentWithCourseIdAndDate } from "@/types";

export type CoursesColumn = {
    id: string;
    title: string;
    price: string;
    status: boolean;
    created_at: string;
    students: StudentWithCourseIdAndDate[]
}

export const columns: ColumnDef<CoursesColumn>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {

            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {

            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: 'status',
        header: 'Published',
        cell: (table) => <span>{table.row.original.status === false ? <X className="w-6 h-6 text-rose-500" /> : <Check className="w-6 h-6 text-green-500" />}</span>
    },
    {
        accessorKey: 'id',
        cell: table => <Action students={table.row.original.students} courseId={table.row.original.id} courseTitle={table.row.original.title} />
    },

]