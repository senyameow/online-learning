import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InfoCard {
    icon: LucideIcon;
    label: string;
    numberOfCourses: number
}

const InfoCard = ({ icon, label, numberOfCourses }: InfoCard) => {
    return (
        <div>InfoCard</div>
    )
}

export default InfoCard