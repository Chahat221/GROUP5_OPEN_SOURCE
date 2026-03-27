import { Booking } from "../../domain/entities/Booking";

export class CreateBooking {
  execute(userId: string, service: string, date: string, startTime: string, endTime: string): Booking {

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: userId,
      service: service,
      date: date,
      startTime: startTime,
      endTime: endTime,
      status: "pending"
    };

    return newBooking;
  }
}