import { getData } from '@/actions/get-data'
import { getSales } from '@/actions/get-sales'
import { getRevenue } from '@/actions/get-total-revenue'
import CardOverview from '@/components/CardOverview'
import Overview from '@/components/Overview'
import { formatter } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { CreditCard, DollarSign } from 'lucide-react'
import React from 'react'

const Analitics = async () => {

    const { userId } = auth()

    const totalRevenue = await getRevenue(userId!)
    const totalSales = await getSales(userId!)
    const data = await getData(userId!)

    return (
        <div className="flex flex-col w-full p-6">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <CardOverview title='Total Revenue' icon={DollarSign}>
                    {formatter.format(totalRevenue)}
                </CardOverview>
                <CardOverview title='Sales' icon={CreditCard}>
                    +{totalSales}
                </CardOverview>
            </div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Overview data={data} />
            </div>
        </div>
    )
}

export default Analitics