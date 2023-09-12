'use client'


import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { CheckIcon, PlusCircle, Store as StoreIcon } from "lucide-react"
import { ChevronsUpDown } from "lucide-react"
import { SelectSeparator } from "./ui/select"
import { useModalStore } from "@/hooks/use-modal-store"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function Switcher({ className, items = [] }: SwitcherProps) {

    const { onOpen } = useModalStore()

    const [open, setOpen] = useState(false)

    const params = useParams()
    const router = useRouter()

    const stores = items.map((item) => ({
        label: item.name,
        storeId: item.id
    }))

    const currentStore = stores.find(store => store.storeId === params.storeId)

    const onSelectStore = ({ label, storeId }: { label: string, storeId: string }) => {
        setOpen(false)
        router.push(`/${storeId}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="select a store"
                    className={cn('flex items-center justify-between', className)}>
                    <div className="flex flex-row items-center">
                        <StoreIcon className="h-4 w-4 mr-2" />
                        <span className="font-bold text-sm">{currentStore?.label}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." className="h-9" />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading='stores'>
                            {stores.map(store => (
                                <CommandItem
                                    key={store.storeId}
                                    onSelect={() => onSelectStore(store)}
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            params.storeId === store.storeId ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    <SelectSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    onOpen('createStore')
                                }}
                            >
                                <PlusCircle className="mr-2 h-6 w-6" />
                                Create a New Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}