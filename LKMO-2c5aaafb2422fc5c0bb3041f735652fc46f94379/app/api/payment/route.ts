import { NextResponse } from "next/server"
import Midtrans from "midtrans-client"
import { reservationProps } from "@/types/reservation"

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export const POST = async (request: Request) => {
    try {
        const reservation : reservationProps = await request.json();
        
        // Add timestamp to make order_id unique for retry attempts
        const timestamp = Date.now();
        const orderId = `${reservation.id}-${timestamp}`;
        
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: reservation.Payment?.amount || 0,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: reservation.User.name,
                email: reservation.User.email,
            },
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?transaction_status=settlement&order_id=${reservation.id}`,
            }
        }

        const token = await snap.createTransactionToken(parameter);
        return NextResponse.json({ token });
    } catch (error) {
        console.error("Payment API error:", error);
        return NextResponse.json({ 
            error: "Failed to create payment token",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}