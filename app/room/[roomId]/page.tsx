
import { Metadata } from 'next'
import RoomDetail from '@/app/components/room-detail'
import { Suspense } from 'react'

export const metadata:Metadata = {
    title: "Room Detail"
}

const RoomDetailPage = async ({
    params,
  }: {
    params: { roomId: string };
  }) => {
    const { roomId } = params;
  
    return (
      <div className="mt-16">
        <Suspense fallback={<p>Loading...</p>}>
          <RoomDetail roomId={roomId} />
        </Suspense>
      </div>
    );
  };
  
  export default RoomDetailPage;
  