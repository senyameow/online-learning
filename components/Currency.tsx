import { formatter } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface CurrencyProps {
    data: string
    size?: string;
}

const Currency = ({ data, size = 'md' }: CurrencyProps) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div className={`font-bold text-${size}`}>
            {formatter.format(Number(data))}
        </div>
    )
}

export default Currency