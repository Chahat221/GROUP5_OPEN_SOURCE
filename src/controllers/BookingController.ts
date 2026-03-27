import { Request, Response } from "express";
import { CreateBooking } from "../application/use-cases/CreateBooking";
import { Booking } from "../domain/entities/Booking";

const bookings: Booking[] = [];

export class BookingController {
  static create(req: Request, res: Response) {
    const { userId, service, date, startTime, endTime } = req.body;

    const createBooking = new CreateBooking();
    const booking = createBooking.execute(
      userId,
      service,
      date,
      startTime,
      endTime
    );

    bookings.push(booking);

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  }

  static getAll(req: Request, res: Response) {
    res.json(bookings);
  }
}