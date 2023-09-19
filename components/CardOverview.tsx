import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { IconNode } from 'lucide-react';

interface CardOverviewProps {
    title: string;
    children: React.ReactNode;
    icon: any
}

const CardOverview = ({ title, icon, children }: CardOverviewProps) => {

    const Icon = icon

    return (
        <Card>
            <CardHeader className='text-sm font-medium'>
                <CardTitle className='flex justify-between w-full items-center'>
                    {title}
                    <Icon className={'w-4 h-4 text-muted-foreground'} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {children}
                </div>
            </CardContent>

        </Card>
    )
}

export default CardOverview