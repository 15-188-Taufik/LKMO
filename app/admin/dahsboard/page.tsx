import {Metadata} from "next";
import DashboardCards from '@/app/components/admin/room/dashboard-cards'
import { Suspense } from "react";
import ReservationList from "@/app/components/admin/reservation-list";

export const metadata: Metadata ={
    title: "Dashboard"
}

const DashboardPage = () => {
  return (
    <div className='py-20 mt-10'>
        <h1 className='text-4xl fond-bold text-gray-800'>Dashboard</h1>
        <Suspense fallback={<p>Loading cards...</p>}>
        <DashboardCards/>
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
        <ReservationList/>
        </Suspense>
    </div>
  )
}

export default DashboardPage