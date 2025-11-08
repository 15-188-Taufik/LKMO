import React from 'react'
import Image from 'next/image'
import { getReservationByUserId } from '@/lib/data'
import { notFound } from 'next/navigation';
import { formatCurrency, formatDate } from '@/lib/utils';
import {differenceInCalendarDays} from "date-fns"
import Link from 'next/link';
import {IoCalendarOutline, IoTimeOutline, IoCardOutline} from 'react-icons/io5';
import PaymentButton from './payment-button';

const MyReserveList = async () => {
    const reservation = await getReservationByUserId();
    if(!reservation) return notFound();
    
    if(reservation.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <IoCalendarOutline className="size-12 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Reservations Yet</h3>
                    <p className="text-gray-600 mb-8 text-lg">Start your journey by booking your perfect room today!</p>
                    <Link 
                        href="/room" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <IoCalendarOutline className="size-5" />
                        Browse Rooms
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div className="grid gap-8">
        {reservation.map((item) => {
            const duration = differenceInCalendarDays(item.endDate, item.startDate);
            const isPaid = item.Payment?.status === 'paid' || item.Payment?.status === 'success';
            const isPending = item.Payment?.status === 'pending';
            
            return (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100" key={item.id}>
                {/* Header with Gradient and Status */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                <IoCardOutline className="size-5" />
                            </div>
                            <div>
                                <p className='text-xs text-orange-100 font-medium'>Booking ID</p>
                                <p className="text-sm font-bold font-mono">{item.id.slice(0, 8).toUpperCase()}</p>
                            </div>
                        </div>
                        <span className={`px-4 py-2 text-xs font-bold rounded-full uppercase shadow-lg ${
                            isPaid
                                ? 'bg-green-500 text-white' :
                            isPending
                                ? 'bg-yellow-400 text-gray-900' :
                            'bg-red-500 text-white'
                        }`}>
                            {isPaid ? 'PAID' : item.Payment?.status || 'UNPAID'}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Image Section with Overlay */}
                    <div className="md:w-2/5 relative h-72 md:h-auto group">
                        <Image 
                            src={item.Room.image} 
                            fill
                            className='object-cover transition-transform duration-500 group-hover:scale-110' 
                            alt={item.Room.name}
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden">
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-bold drop-shadow-lg">{item.Room.name}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Info Section with Better Layout */}
                    <div className="flex-1 p-6 md:p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">{item.Room.name}</h3>
                        
                        {/* Booking Details in Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* Check-in Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <IoCalendarOutline className="text-blue-600 size-5" />
                                    <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide">Check-in</p>
                                </div>
                                <p className="text-base font-bold text-gray-900">{formatDate(item.startDate.toISOString())}</p>
                            </div>

                            {/* Check-out Card */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <IoCalendarOutline className="text-purple-600 size-5" />
                                    <p className="text-xs text-purple-700 font-semibold uppercase tracking-wide">Check-out</p>
                                </div>
                                <p className="text-base font-bold text-gray-900">{formatDate(item.endDate.toISOString())}</p>
                            </div>

                            {/* Duration Card */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <IoTimeOutline className="text-green-600 size-5" />
                                    <p className="text-xs text-green-700 font-semibold uppercase tracking-wide">Duration</p>
                                </div>
                                <p className="text-base font-bold text-gray-900">
                                    {duration} {duration > 1 ? 'Nights' : 'Night'}
                                </p>
                            </div>

                            {/* Total Amount Card */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <IoCardOutline className="text-orange-600 size-5" />
                                    <p className="text-xs text-orange-700 font-semibold uppercase tracking-wide">Total</p>
                                </div>
                                <p className="text-lg font-bold text-gray-900">
                                    {item.Payment && formatCurrency(item.Payment.amount)}
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-6 border-t-2 border-gray-100">
                            {!isPaid ? (
                                <div className="w-full md:w-auto md:min-w-[220px]">
                                    <PaymentButton reservation={item} />
                                </div>
                            ): (
                                <Link 
                                    href={`/myreservation/${item.id}`} 
                                    className='px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                >
                                    View Details →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )})}
    </div>
  )
}

export default MyReserveList