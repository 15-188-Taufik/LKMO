"use client";
import DatePicker from "react-datepicker";
import {useState, useActionState} from "react";
import {addDays} from "date-fns";
import { createReserve } from "@/lib/actions";
import { RoomDetailProps, DisabledDateProps } from "@/types/room";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";

const ReserveForm = ({
    room,
    disabledDate
}: {
    room: RoomDetailProps;
    disabledDate: DisabledDateProps[];
}) => {
    const StartDate = new Date();
    const EndDate = addDays(StartDate, 1);

    const [startDate, setStartDate] = useState<Date | null>(StartDate);
    const [endDate, setEndDate] = useState<Date | null>(EndDate);

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    
    const [state, formAction, isPending] = useActionState(
        createReserve.bind(null, room.id, room.price), 
        null
    )

    const excludeDates = disabledDate.map((item) => {
        return{
            start: item.startDate,
            end: item.endDate,
        }
    })
  return (
    <div>
        <form action={formAction}>
            {/* Hidden inputs untuk tanggal */}
            <input type="hidden" name="startDate" value={startDate?.toISOString() || ''} />
            <input type="hidden" name="endDate" value={endDate?.toISOString() || ''} />
            
            <div className="mb-4">
                <label htmlFor="datepicker" className="block mb-2 text-sm font-medium text-gray-900">Check-in & Check-out Date</label>
                <DatePicker 
                id="datepicker"
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange={true}
                onChange={handleDateChange}
                excludeDateIntervals={excludeDates}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select check-in and check-out dates"
                monthsShown={2}
                wrapperClassName="w-full"
                className="py-2 px-4 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Click to select check-in date, then click again to select check-out date</p>
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        className="py-2 px-4 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent" 
                        placeholder="Full Name..." 
                    />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input 
                        type="text" 
                        id="phone"
                        name="phone" 
                        className="py-2 px-4 rounded-md border border-gray-300 w-full focus:ring-2 focus:ring-orange-400 focus:border-transparent" 
                        placeholder="Phone Number..." 
                    />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
                </div>
            </div>
            <button 
            disabled={isPending || !startDate || !endDate} 
            type="submit" 
            className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500 transition-colors",{
                "opacity-50 cursor-not-allowed" : isPending || !startDate || !endDate,
            })}>
             {isPending ? "Processing..." : "Reserve Now"}   
            </button>
    </form>
    </div>
  )
}

export default ReserveForm