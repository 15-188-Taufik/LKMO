import { Metadata } from 'next'
import {auth} from "@/auth"
import MyReserveList from '@components/my-reserve-list'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "My Reservation"
}

const MyReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/signin")
    
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-8 mt-16">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Reservations
          </h1>
          <p className="text-gray-600">
            Hi, <span className="font-semibold text-gray-900">{session.user.name}</span>! Here&apos;s your booking history.
          </p>
        </div>

        {/* Reservation List Section */}
        <MyReserveList />

      </div>
    </div>
  )
}

export default MyReservationPage