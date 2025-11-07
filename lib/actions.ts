"use server";
import { ContactSchema, RoomSchema, ReserveSchema } from "./zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

// CREATE ROOM
export const saveRoom = async (image: string, prevState: unknown, formData: FormData) => {
  if (!image) return { message: "Image is Required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({
              amenitiesId: item,
            })),
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }

  redirect("/admin/room");
};

// DELETE ROOM
export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({
      where: {id}
    })
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/admin/room");
};

//Create Reserve room
export const createReserve = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if(!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=room/${roomId}`)

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  }

  const validatedFields = ReserveSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {name, phone} = validatedFields.data;
  const night = differenceInCalendarDays(endDate, startDate);
  if(night <= 0) return {messageDate: "Date must be at least 1 night"}
  const total = night * price;

  let reservationId;
  try {
    await prisma.$transaction(async(tx) => {
      await tx.user.update({
        data:{
          name,
          phone
        },
        where: {id: session.user.id}
      });
      const reservation = await tx.reservation.create({
        data: {
          startDate,
          endDate,
          price,
          roomId,
          userId: session.user.id as string, 
          Payment: {
            create: {
              amount: total
            }
          }
        }
      });
      reservationId = reservation.id;
    })
  } catch (error) {
    console.log(error)
  }
  redirect(`/checkout/${reservationId}`);
};

// UPDATE ROOM
export const updateRoom = async (
  roomId: string,
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is Required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      }),
    ]);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin/room");
  redirect("/admin/room");
};

// CONTACT
export const ContactMessage = async (prevState: unknown, formData: FormData) => {
  const validateFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return { error: validateFields.error.flatten().fieldErrors };
  }

  const { name, email, subject, message } = validateFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return { message: "Thanks for contacting us" };
  } catch (error) {
    console.error(error);
  }
};
