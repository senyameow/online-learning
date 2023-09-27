import { cva } from 'class-variance-authority';
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { cn } from '@/lib/utils';


interface CourseProgressProps {
    variant?: 'default' | 'success';
    size?: 'sm' | 'default';
    value: number;

}

const colorByVariant = {
    default: 'text-sky-700',
    success: `text-emerald-600`
}
const sizeByVariant = {
    default: 'text-sm',
    sm: `text-xs`
}

const CourseProgress = ({ variant, value, size }: CourseProgressProps) => {
    return (
        <div>
            <Progress value={value} variant={variant} className={cn(`h-2 w-full bg-gray-300`)} />
            <p className={cn(`font-medium mt-2 text-sky-700`, colorByVariant[variant || 'default'], sizeByVariant[size || 'sm'])}>
                you completed {value}%
            </p>
        </div>
    )
}

export default CourseProgress