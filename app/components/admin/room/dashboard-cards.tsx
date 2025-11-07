import React from 'react'
import { formatCurrency } from '@/lib/utils'
import {LuChartArea, LuShoppingCart, LuUsers} from "react-icons/lu"
import { getRevenueAndReserve, getTotalCustomer } from '@/lib/data'
import { notFound } from 'next/navigation'

const DashboardCards = async () => {
    const [data, customer] = await Promise.all([
        getRevenueAndReserve(),
        getTotalCustomer(),
    ]);

    if(!data || !customer) return notFound();
  return (
    <div className='grid md:grid-cols-3 gap-6 mb-8'>
        {/* Total Revenue Card */}
        <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <LuChartArea className='size-8 text-white'/>
                    </div>
                    <div className="text-white/80 text-sm font-medium">This Month</div>
                </div>
                <div className="text-white">
                    <h3 className='text-sm font-medium mb-1 text-white/90'>Total Revenue</h3>
                    <p className='text-3xl font-bold'>{formatCurrency(data.revenue)}</p>
                </div>
            </div>
        </div>

        {/* Total Reservation Card */}
        <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <LuShoppingCart className='size-8 text-white'/>
                    </div>
                    <div className="text-white/80 text-sm font-medium">All Time</div>
                </div>
                <div className="text-white">
                    <h3 className='text-sm font-medium mb-1 text-white/90'>Total Reservations</h3>
                    <p className='text-3xl font-bold'>{data.reserve}</p>
                </div>
            </div>
        </div>

        {/* Total Customer Card */}
        <div className="group bg-gradient-to-br from-green-500 to-green-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <LuUsers className='size-8 text-white'/>
                    </div>
                    <div className="text-white/80 text-sm font-medium">Active</div>
                </div>
                <div className="text-white">
                    <h3 className='text-sm font-medium mb-1 text-white/90'>Total Customers</h3>
                    <p className='text-3xl font-bold'>{customer.length}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardCards