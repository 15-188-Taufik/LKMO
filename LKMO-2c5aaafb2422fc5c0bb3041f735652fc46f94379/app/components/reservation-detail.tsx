import React from 'react'
import { getReservationById } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { differenceInCalendarDays } from 'date-fns';
import { notFound } from 'next/navigation';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoCalendarOutline, IoCardOutline, IoBedOutline, IoTimeOutline, IoCheckmarkCircle } from 'react-icons/io5';
import PaymentButton from './payment-button';

const ReservationDetail = async ({reservationId}: {reservationId: string}) => {
    const reservation = await getReservationById(reservationId);
    if(!reservation) return notFound();
    
    const duration = differenceInCalendarDays(reservation.endDate, reservation.startDate);
    const paymentStatus = reservation.Payment?.status || 'unpaid';
    const isPaid = paymentStatus === 'paid' || paymentStatus === 'success';
    const isPending = paymentStatus === 'pending';
    
  return (
    <div className='w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100'>
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className='text-3xl font-bold mb-2'>Reservation Summary</h2>
                    <p className='text-orange-100 flex items-center gap-2'>
                        <IoCardOutline className="size-5" />
                        Booking ID: <span className="font-mono font-bold">#{reservation.id.slice(0, 8).toUpperCase()}</span>
                    </p>
                </div>
                <span className={`px-6 py-3 text-sm font-bold rounded-full uppercase shadow-lg ${
                    isPaid
                        ? 'bg-green-500 text-white' :
                    isPending
                        ? 'bg-yellow-400 text-gray-900' :
                    'bg-red-500 text-white'
                }`}>
                    {isPaid ? 'PAID' : paymentStatus}
                </span>
            </div>
        </div>

        <div className="p-8 space-y-8">
            {/* Guest Information */}
            <div>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2">
                        <IoPersonOutline className='text-white' size={24} />
                    </div>
                    Guest Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                            <IoPersonOutline className='text-blue-600' size={20} />
                            <p className='text-xs text-blue-700 font-semibold uppercase tracking-wide'>Guest Name</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg'>{reservation.User.name}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                            <IoMailOutline className='text-purple-600' size={20} />
                            <p className='text-xs text-purple-700 font-semibold uppercase tracking-wide'>Email</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg break-all'>{reservation.User.email}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                            <IoCallOutline className='text-green-600' size={20} />
                            <p className='text-xs text-green-700 font-semibold uppercase tracking-wide'>Phone Number</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg'>{reservation.User.phone}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
                        <div className="flex items-center gap-3 mb-2">
                            <IoCalendarOutline className='text-amber-600' size={20} />
                            <p className='text-xs text-amber-700 font-semibold uppercase tracking-wide'>Booking Date</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg'>{formatDate(reservation.createdAt.toISOString())}</p>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-2">
                        <IoCardOutline className='text-white' size={24} />
                    </div>
                    Payment Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                        <div className="flex items-center gap-3 mb-2">
                            <IoCardOutline className='text-orange-600' size={20} />
                            <p className='text-xs text-orange-700 font-semibold uppercase tracking-wide'>Payment Method</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg capitalize'>
                            {reservation.Payment?.method ? reservation.Payment.method.replace("_", " ") : "Not Set"}
                        </p>
                    </div>
                    <div className={`bg-gradient-to-br rounded-xl p-5 border ${
                        isPaid
                            ? 'from-green-50 to-green-100 border-green-200' :
                        isPending
                            ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
                        'from-red-50 to-red-100 border-red-200'
                    }`}>
                        <div className="flex items-center gap-3 mb-2">
                            <IoCheckmarkCircle className={`${
                                isPaid ? 'text-green-600' :
                                isPending ? 'text-yellow-600' :
                                'text-red-600'
                            }`} size={20} />
                            <p className={`text-xs font-semibold uppercase tracking-wide ${
                                isPaid ? 'text-green-700' :
                                isPending ? 'text-yellow-700' :
                                'text-red-700'
                            }`}>Payment Status</p>
                        </div>
                        <p className='font-bold text-gray-900 text-lg uppercase'>{isPaid ? 'PAID' : paymentStatus}</p>
                    </div>
                </div>
            </div>

            {/* Reservation Details */}
            <div>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2">
                        <IoBedOutline className='text-white' size={24} />
                    </div>
                    Reservation Details
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-gray-300">
                        <div>
                            <p className='text-sm text-gray-600 mb-2'>Room Type</p>
                            <p className='text-2xl font-bold text-gray-900'>{reservation.Room.name}</p>
                        </div>
                        <div className="text-right">
                            <p className='text-sm text-gray-600 mb-2'>Price per Night</p>
                            <p className='text-2xl font-bold text-orange-600'>{formatCurrency(reservation.price)}</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                                <IoCalendarOutline className='text-blue-600' size={20} />
                                <p className='text-xs text-blue-700 font-semibold uppercase'>Check-in</p>
                            </div>
                            <p className='font-bold text-gray-900'>{formatDate(reservation.startDate.toISOString())}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
                            <div className="flex items-center gap-2 mb-2">
                                <IoCalendarOutline className='text-purple-600' size={20} />
                                <p className='text-xs text-purple-700 font-semibold uppercase'>Check-out</p>
                            </div>
                            <p className='font-bold text-gray-900'>{formatDate(reservation.endDate.toISOString())}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                                <IoTimeOutline className='text-green-600' size={20} />
                                <p className='text-xs text-green-700 font-semibold uppercase'>Duration</p>
                            </div>
                            <p className='font-bold text-gray-900'>{duration} {duration > 1 ? 'Nights' : 'Night'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Amount - Highlighted */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <p className='text-orange-100 mb-2 text-lg'>Total Amount</p>
                        <p className='text-4xl font-bold mb-3'>{reservation.Payment && formatCurrency(reservation.Payment.amount)}</p>
                        <p className='text-orange-100 flex items-center gap-2'>
                            <IoCardOutline size={20} />
                            {formatCurrency(reservation.price)} × {duration} {duration > 1 ? 'nights' : 'night'}
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                            <IoCardOutline size={64} className='text-white' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Button for Unpaid Status */}
            {!isPaid && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete Your Payment?</h4>
                            <p className="text-gray-600">Complete your payment now to confirm your reservation.</p>
                        </div>
                        <div className="w-full md:w-auto md:min-w-[280px]">
                            <PaymentButton reservation={reservation} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ReservationDetail