import { Request, Response } from "express";
import { CreateBooking } from "../application/use-cases/CreateBooking";

export class BookingController {
  create(req: Request, res: Response) {
    const { userId, date } = req.body;

    const createBooking = new CreateBooking();
    const booking = createBooking.execute(userId, date);

    res.status(201).json(booking);
  }
}