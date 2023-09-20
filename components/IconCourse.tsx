import { LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'


const bgVariants = cva(
    `rounded-full flex items-center justify-center`,
    {
        variants: {
            variant: {
                default: `bg-sky-100`,
                success: `bg-emerald-100`,
                error: `bg-rose-700`
            },
            size: {
                default: 'p-2',
                sm: 'p-1'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

const iconVariants = cva(
    ``,
    {
        variants: {
            variant: {
                default: 'text-sky-700',
                success: `text-emerald-700`,
                error: `text-rose-700`
            },
            size: {
                default: `w-8 h-8`,
                sm: `w-4 h-4`
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

type IconVariantsProps = VariantProps<typeof iconVariants>
type bgVariantsProps = VariantProps<typeof bgVariants>

interface IconCourseProps extends IconVariantsProps, bgVariantsProps {
    icon: LucideIcon
}

const IconCourse = ({ icon: Icon, variant, size }: IconCourseProps) => {

    return (
        <div className={cn(bgVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    )
}

export default IconCourse