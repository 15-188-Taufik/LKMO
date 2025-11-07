// app/room/[roomId]/page.tsx
import { Metadata } from "next";
import RoomDetail from "@components/room-detail";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
};

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  // ✅ karena Next 16, params adalah Promise
  const { roomId } = await params;
  console.log("roomId:", roomId);

  return (
    <div className="mt-16">
      <Suspense fallback={<p>Loading...</p>}>
        <RoomDetail roomId={roomId} />
        <h1>Test Params</h1>
        <p>Room ID: {roomId ?? "No ID"} halo</p>
      </Suspense>
    </div>
  );
}
