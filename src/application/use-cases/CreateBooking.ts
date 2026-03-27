import { Booking } from "../../domain/entities/Booking";

export class CreateBooking {
  execute(
    userId: string,
    service: string,
    date: string,
    startTime: string,
    endTime: string,
    bookings: Booking[]
  ): Booking | null {

    const conflict = bookings.find(
      (b) =>
        b.service === service &&
        b.date === date &&
        b.startTime === startTime &&
        b.endTime === endTime
    );

    if (conflict) {
      return null;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId,
      service,
      date,
      startTime,
      endTime,
      status: "pending"
    };

    return newBooking;
  }
}