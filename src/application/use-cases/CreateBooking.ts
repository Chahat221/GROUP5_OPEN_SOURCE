import { Booking } from "../../domain/entities/Booking";

export class CreateBooking {

  execute(userId: string, date: string): Booking {

    const booking: Booking = {
      id: Math.random().toString(),
      userId,
      date
    };

    return booking;
  }

}