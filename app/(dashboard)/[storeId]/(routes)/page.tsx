import getMonthlyRevenue from '@/actions/getMonthlyRevenue'
import getTotalProducts from '@/actions/getTotalProducts'
import getTotalRevenue from '@/actions/getTotalRevenue'
import getTotalSales from '@/actions/getTotalSales'
import CardOverview from '@/components/CardOverview'
import Heading from '@/components/Heading'
import Overview from '@/components/Overview'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import React from 'react'

interface DashboardProps {
    params: {
        storeId: string;
    }
}

const Dashboard = async ({ params }: DashboardProps) => {

    const totalRevenue = await getTotalRevenue(params.storeId)
    const totalSales = await getTotalSales(params.storeId)
    const totalProducts = await getTotalProducts(params.storeId)

    const data = await getMonthlyRevenue(params.storeId)

    return (
        <div className='flex flex-col'>
            <div className='flex-1 p-8 pt-6 space-y-8'>
                <Heading title='Dashboard' description='your progress in Your hands' />
                <Separator />
                <div className='grid grid-cols-3 gap-3'>
                    <CardOverview title='Total Revenue' icon={DollarSign}>
                        {formatter.format(totalRevenue)}
                    </CardOverview>
                    <CardOverview title='Sales' icon={CreditCard}>
                        +{totalSales}
                    </CardOverview>
                    <CardOverview title='Products in stock' icon={Package}>
                        {totalProducts}
                    </CardOverview>

                </div>
                <CardOverview title='Overview'>
                    <Overview data={data} />
                </CardOverview>
            </div>
        </div>
    )
}

export default Dashboard