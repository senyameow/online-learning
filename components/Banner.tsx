'use client'
import { AlertTriangle, CheckCircleIcon, Cross, StopCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import Countdown from 'react-countdown';
import { Coupon } from "@prisma/client";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
                error: "bg-rose-600 border-rose-600 text-white"
            }
        },
        defaultVariants: {
            variant: "warning",
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
    canClose?: boolean,
    coupon?: Coupon
};

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
    error: StopCircle,
};

export const Banner = ({
    label,
    variant,
    canClose,
    coupon
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

    const [isOpen, setIsOpen] = useState(true)

    const onClose = () => {
        setIsOpen(false)
    }

    return (
        <div className={cn(`flex flex-row items-center justify-between transition`, isOpen ? 'opacity-100' : 'opacity-0 hidden', bannerVariants({ variant }))}>
            <div className="flex flex-row items-center">
                <Icon className="h-4 w-4 mr-2" />
                <span>{label}</span>
            </div>
            {canClose && (
                <Button onClick={onClose} variant={'ghost'} className="border border-white mr-6" >
                    OK
                </Button>
            )}

        </div>
    );
};