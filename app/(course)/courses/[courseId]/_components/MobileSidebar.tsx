import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

import React from 'react'
import Sidebar from "./Sidebar"
import { Chapter } from "@prisma/client";

interface MobileSidebarProps {
    chapters: Chapter[];
    title: string;
    isBought: boolean;
}

const MobileSidebar = ({ title, chapters, isBought }: MobileSidebarProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild className="block md:hidden hover:opacity-80 transition hover:shadow-xl hover:bg-gray-100/30 cursor-pointer">
                <Menu />
            </SheetTrigger >
            <SheetContent className="p-0 w-[280px]" side={"left"}>
                <Sidebar title={title} chapters={chapters} isBought={isBought} />
            </SheetContent>
        </Sheet >
    )
}

export default MobileSidebar