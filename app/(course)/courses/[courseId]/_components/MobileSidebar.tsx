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

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="block md:hidden hover:opacity-80 transition hover:shadow-xl hover:bg-gray-100/30 cursor-pointer">
                <Menu />
            </SheetTrigger >
            <SheetContent className="p-0 w-[280px]" side={"left"}>
                <Sidebar />
            </SheetContent>
        </Sheet >
    )
}

export default MobileSidebar