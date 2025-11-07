import React from 'react'
import Image from 'next/image'
import { getReservationByUserId } from '@/lib/data'
import { notFound } from 'next/navigation';
import { formatCurrency, formatDate } from '@/lib/utils';
import {differenceInCalendarDays} from "date-fns"
import Link from 'next/link';
import {IoCalendarOutline, IoTimeOutline, IoCardOutline} from 'react-icons/io5';

const MyReserveList = async () => {
    const reservation = await getReservationByUserId();
    if(!reservation) return notFound();
    
    if(reservation.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <IoCalendarOutline className="size-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reservations Yet</h3>
                <p className="text-gray-500 mb-6">Start booking your perfect room today!</p>
                <Link href="/room" className="inline-block px-6 py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                    Browse Rooms
                </Link>
            </div>
        )
    }

  return (
    <div className="grid gap-6">
        {reservation.map((item) =>(
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden" key={item.id}>
                {/* Header with ID and Status */}
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b">
                    <div className="flex items-center gap-2">
                        <IoCardOutline className="text-gray-600" />
                        <span className='text-sm font-medium text-gray-700'>
                            ID: <span className="font-mono text-gray-900">{item.id.slice(0, 8)}...</span>
                        </span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase ${
                        item.Payment?.status === 'success' ? 'bg-green-100 text-green-800' :
                        item.Payment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {item.Payment?.status || 'unpaid'}
                    </span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative h-64 md:h-auto">
                        <Image 
                            src={item.Room.image} 
                            fill
                            className='object-cover' 
                            alt={item.Room.name}
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{item.Room.name}</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* Check-in & Check-out */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <IoCalendarOutline className="text-orange-500 size-5 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Check-in</p>
                                        <p className="text-sm font-semibold text-gray-900">{formatDate(item.startDate.toISOString())}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <IoCalendarOutline className="text-orange-500 size-5 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Check-out</p>
                                        <p className="text-sm font-semibold text-gray-900">{formatDate(item.endDate.toISOString())}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Duration & Price */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <IoTimeOutline className="text-orange-500 size-5 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {differenceInCalendarDays(item.endDate, item.startDate)} Night(s)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <IoCardOutline className="text-orange-500 size-5 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {item.Payment && formatCurrency(item.Payment.amount)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-4 border-t">
                            {item.Payment?.status === "unpaid" ? (
                                <Link 
                                    href={`/checkout/${item.id}`} 
                                    className='px-6 py-2.5 bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500 transition-colors flex items-center gap-2'
                                >
                                    <IoCardOutline className="size-5" />
                                    Pay Now
                                </Link>
                            ): (
                                <Link 
                                    href={`/myreservation/${item.id}`} 
                                    className='px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors'
                                >
                                    View Details
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MyReserveList