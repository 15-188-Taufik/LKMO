import { Metadata } from 'next'
import ReservationDetail from '@components/reservation-detail';
import { Suspense } from 'react';
import Script from 'next/script';

export const metadata: Metadata ={
    title: "Reservation Detail"
}

const MyReservationDetail = async ({
    params
}:{
    params: Promise<{id: string}>;
}) => {
    const reservationId = (await params).id;
  return (
    <div className='min-h-screen bg-slate-50'>
        <div className="max-2-screen-lg mx-auto mt-10 py-20 px-4">
            {/* reservation detail */}
            <Suspense fallback={<p>Loading...</p>}>
                <ReservationDetail reservationId={reservationId}/>
            </Suspense>
        </div>

        {/* Midtrans Snap Script for Payment */}
        <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="lazyOnload"
        />
    </div>
  )
}

export default MyReservationDetail