'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface OverviewProps {
    data: any[]
}

const Overview = ({ data }: OverviewProps) => {


    return (
        <ResponsiveContainer width='100%' height={450}>
            <BarChart data={data}>
                <XAxis dataKey={'name'} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={true} tickFormatter={value => `$${value}`} />
                <Bar dataKey={`total`} fill='#4432DD' radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Overview