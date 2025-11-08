import {Prisma} from "@prisma/client"

export type reservationProps = Prisma.ReservationGetPayload<{
    include:{
        Room: {
            select: {
                name: true,
                image: true,
                price: true,
            }
        },
        User: {
            select: {
                name: true,
                email: true,
                phone: true,
            }
        }
        Payment: true;
        
    }
}>

export interface Reservation {
    id: string;
    User: {
      name: string;
    };
    Room: {
      name: string;
      image: string;
    };
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    price: number;
    Payment?: {
      status: string;
    };
  }
  