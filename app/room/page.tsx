import {Metadata} from "next";
import {Suspense} from "react"
import HeaderSection from "../components/header-section";
import Main from "../components/main";
import RoomSkeleton from "../components/skeletons/room-skeleton";

export const metadata: Metadata = {
    title: "Rooms & Rates",
    description: "Choose your best room today",
};

const RoomPage = () => {
    return(
        <div>
            <HeaderSection
                title="Rooms & Rates"
                subTitle="Lorem ipsum dolor sit amet."
            />
            <div className="mt-10 px-4">
                <Suspense fallback={
                    <p>{<RoomSkeleton/>}</p>
                }>
                    <Main/>
                </Suspense>
            </div>
        </div>
    )
}

export default RoomPage