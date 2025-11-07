import { getReservations } from "@/lib/data"
import Image from "next/image";
import { formatDate,formatCurrency } from "@/lib/utils";


const ReservationList = async() => {
    const reservation = await getReservations();
    if(!reservation) return <p>No Reservation Found</p>
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Image</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Guest Name</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Check-in</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Check-out</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Room</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Total Price</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Booked Date</th>
                    <th className='px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
                </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
                {
                    reservation.map((reserve) => (
                        <tr className='hover:bg-gray-50 transition-colors' key={reserve.id}>
                            <td className='px-6 py-4'>
                                <div className="h-16 w-24 relative rounded-md overflow-hidden">
                                    <Image src={reserve.Room.image} fill sizes="20vw" alt="room image"
                                    className="object-cover"/>
                                </div>
                            </td>
                            <td className='px-6 py-4'>
                                <div className="font-medium text-gray-900">{reserve.User.name}</div>
                                <div className="text-sm text-gray-500">{reserve.User.email}</div>
                            </td>
                            <td className='px-6 py-4 text-gray-700'>
                                {formatDate(reserve.startDate.toISOString())}
                            </td>
                            <td className='px-6 py-4 text-gray-700'>
                                {formatDate(reserve.endDate.toISOString())}
                            </td>
                            <td className='px-6 py-4'>
                                <div className="font-medium text-gray-900">{reserve.Room.name}</div>
                            </td>
                            <td className='px-6 py-4'>
                                <div className="font-semibold text-gray-900">{formatCurrency(reserve.price)}</div>
                            </td>
                            <td className='px-6 py-4 text-gray-500 text-sm'>
                                {formatDate(reserve.createdAt.toISOString())}
                            </td>
                            <td className='px-6 py-4 text-center'>
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                                    reserve.Payment?.status === 'success' ? 'bg-green-100 text-green-800' :
                                    reserve.Payment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {reserve.Payment?.status || 'pending'}
                                </span>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ReservationList