'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import qs from 'query-string'
import { useDebounce } from '@/hooks/use-debounce'

const Search = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [value, setValue] = useState('')
    const debouncedValue = useDebounce(value, 500)

    const currentCategoryId = searchParams.get('categoryId')

    // const current = qs.parse(searchParams.toString())

    useEffect(() => {
        console.log(value)

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)

    }, [debouncedValue, currentCategoryId, router, pathname])

    return (
        <div className='relative'>
            <SearchIcon className='w-4 h-4 mr-3 absolute top-3 left-3 ' />
            <Input onChange={e => setValue(e.target.value)} value={value} className='w-full bg-gray-100 rounded-xl px-8 ' placeholder='find a course...' />
        </div>
    )
}

export default Search