import IconCourse from '@/components/IconCourse';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InfoCard {
    icon: LucideIcon;
    label: string;
    numberOfCourses: number;
    variant: "error" | "default" | "success";
}

const InfoCard = ({ icon, label, numberOfCourses, variant }: InfoCard) => {
    return (
        <Button variant={'ghost'} className='min-h-fit h-fit w-full p-4 flex border border-black/70 justify-start rounded-lg'>
            <div className='flex items-center flex-row w-full gap-5'>
                <IconCourse icon={icon} variant={variant} size={'default'} />
                <div className='flex flex-col h-full justify-between'>
                    <span className='text-lg font-bold'>{label}</span>
                    <span className='text-sm text-neutral-600'>{numberOfCourses} {numberOfCourses > 1 || numberOfCourses == 0 ? <span>Courses</span> : <span>Course</span>}</span>
                </div>
            </div>
        </Button>
    )
}

export default InfoCard