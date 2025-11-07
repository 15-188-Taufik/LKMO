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
    <div className="min-h-screen bg-slate-50">
  <div className="max-w-screen-lg mx-auto px-4 py-20 mt-10">
    
    {/* Header Section */}
    <header className="mb-8 text-center md:text-left">
      <h3 className="text-2xl font-semibold text-gray-800">
        Hi, {session.user.name}
      </h3>
      <p className="text-gray-600 mt-1">
        Here&apos;s your booking history:
      </p>
    </header>

    {/* Reservation List Section */}
    <section className="rounded-lg bg-white shadow-sm border border-gray-200 p-4">
      <MyReserveList />
    </section>

  </div>
</div>
  )
}

export default MyReservationPage