"use client";
import { reservationProps } from "@/types/reservation"
import { useState } from "react";
import { IoCardOutline } from "react-icons/io5";

declare global {
    interface Window {
        snap: {
            pay: (token: string, options?: {
                onSuccess?: (result: any) => void;
                onPending?: (result: any) => void;
                onError?: (result: any) => void;
                onClose?: () => void;
            }) => void;
        }
    }
}

const PaymentButton = ({
    reservation
}:{
    reservation: reservationProps
}) => {
    const [isPending, setIsPending] = useState(false);
    
    const handlePayment = async () => {
        setIsPending(true);
        
        try {
            // Always generate new token for each payment attempt
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            if(data.token) {
                // Check if snap is loaded
                if(window.snap) {
                    window.snap.pay(data.token, {
                        onSuccess: (result) => {
                            console.log('Payment success:', result);
                            // Redirect to success page
                            window.location.href = `/payment/success?transaction_status=settlement&order_id=${reservation.id}`;
                        },
                        onPending: (result) => {
                            console.log('Payment pending:', result);
                            // Redirect to pending page
                            window.location.href = `/payment/pending?transaction_status=pending&order_id=${reservation.id}`;
                        },
                        onError: (result) => {
                            console.log('Payment error:', result);
                            setIsPending(false);
                            alert('Payment failed. Please try again.');
                        },
                        onClose: () => {
                            console.log('Payment popup closed');
                            setIsPending(false);
                        }
                    });
                } else {
                    console.error("Midtrans Snap not loaded");
                    alert("Payment gateway is loading. Please refresh the page and try again.");
                    setIsPending(false);
                }
            } else {
                console.error("No token received from API");
                alert("Failed to initialize payment. Please try again.");
                setIsPending(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Unable to process payment. Please try again or contact support.");
            setIsPending(false);
        }
    }

  return (
    <button 
        onClick={handlePayment} 
        disabled={isPending}
        className='px-6 py-2.5 w-full font-semibold text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
    >
        <IoCardOutline className="size-5" />
        {isPending ? "Processing..." : "Process Payment"} 
    </button>
   )
}

export default PaymentButton