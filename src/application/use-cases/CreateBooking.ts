import { Booking } from "../../domain/entities/Booking";

export class CreateBooking {
  execute(userId: string, date: string): Booking {
    const newBooking: Booking = {
      id: Math.random().toString(),
      userId,
      date
    };

    return newBooking;
  }
}