import { Request, Response } from "express";

const bookings: any[] = [];

export class BookingController {
  static create(req: Request, res: Response) {
    const newBooking = {
      id: Date.now().toString(),
      status: "pending",
      ...req.body
    };

    bookings.push(newBooking);

    return res.json({
      message: "Booking created successfully",
      booking: newBooking
    });
  }

  static getAll(req: Request, res: Response) {
    return res.json({
      bookings
    });
  }

  static updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const booking = bookings.find((b) => b.id === id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;

    return res.json({
      message: "Status updated",
      booking
    });
  }

  static cancel(req: Request, res: Response) {
    const { id } = req.params;

    const index = bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const deleted = bookings.splice(index, 1);

    return res.json({
      message: "Booking cancelled",
      booking: deleted[0]
    });
  }
}