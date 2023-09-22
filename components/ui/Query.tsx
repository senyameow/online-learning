'use client'
import React from 'react'
import qs from 'query-string'
import { useParams, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Category } from '@prisma/client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface QueryProps {
    item: Category;
    valueKey: string;
    valueKey2?: string;
}

const Query = ({ item, valueKey, valueKey2 }: QueryProps) => {

    const searchParams = useSearchParams()
    const pathname = usePathname()

    const selectedValue = searchParams.get(valueKey)
    const selectedValue2 = searchParams.get(valueKey2!)

    const current = qs.parse(searchParams.toString())

    const query = {
        ...current,
        [valueKey]: selectedValue ? null : item.id,
        [valueKey2!]: selectedValue2
    }

    const url = qs.stringifyUrl({
        url: pathname,
        query
    }, { skipNull: true, skipEmptyString: true }
    )

    return (
        <Link href={url} className={cn(`cursor-pointer px-2 py-2 border rounded-full text-sm font-bold hover:bg-gray-100 transition`, selectedValue === item.id && 'bg-black text-white hover:bg-black/80 hover:text-gray-100')}>
            {item?.title}
        </Link>
    )
}

export default Query