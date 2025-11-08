import {Metadata} from "next";
import DashboardCards from '@/app/components/admin/room/dashboard-cards'
import { Suspense } from "react";
import ReservationList from "@/app/components/admin/reservation-list";

export const metadata: Metadata ={
    title: "Dashboard"
}

const DashboardPage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className='max-w-screen-xl mx-auto px-4 py-8 mt-16'>
            {/* Header Section */}
            <div className='mb-8'>
                <h1 className='text-4xl font-bold text-gray-900 mb-2'>Admin Dashboard</h1>
                <p className='text-gray-600'>Welcome back! Here's what's happening with your hotel today.</p>
            </div>

            {/* Stats Cards */}
            <Suspense fallback={
                <div className='grid md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-white p-6 rounded-lg shadow-sm animate-pulse h-32'></div>
                    <div className='bg-white p-6 rounded-lg shadow-sm animate-pulse h-32'></div>
                    <div className='bg-white p-6 rounded-lg shadow-sm animate-pulse h-32'></div>
                </div>
            }>
                <DashboardCards/>
            </Suspense>

            {/* Reservation List Section */}
            <div className='mb-4'>
                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Recent Reservations</h2>
            </div>
            <Suspense fallback={
                <div className='bg-white p-6 rounded-lg shadow-sm animate-pulse h-64'></div>
            }>
                <ReservationList/>
            </Suspense>
        </div>
    </div>
  )
}

export default DashboardPage