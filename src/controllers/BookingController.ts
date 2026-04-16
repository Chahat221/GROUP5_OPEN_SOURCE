import { Request, Response } from "express";
import { BookingModel } from "../infrastructure/database/models/BookingModel";

export class BookingController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, service, date, startTime, endTime } = req.body;

      const existingBooking = await BookingModel.findOne({
        service,
        date,
        startTime,
        endTime
      });

      if (existingBooking) {
        res.status(400).json({
          message: "Time slot already booked"
        });
        return;
      }

      const booking = await BookingModel.create({
        userId,
        service,
        date,
        startTime,
        endTime,
        status: "pending"
      });

      res.status(201).json({
        message: "Booking created successfully",
        booking
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create booking",
        error
      });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await BookingModel.find();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch bookings",
        error
      });
    }
  }

  static async cancel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedBooking = await BookingModel.findByIdAndDelete(id);

      if (!deletedBooking) {
        res.status(404).json({
          message: "Booking not found"
        });
        return;
      }

      res.json({
        message: "Booking cancelled successfully",
        booking: deletedBooking
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to cancel booking",
        error
      });
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (status !== "accepted" && status !== "declined") {
        res.status(400).json({
          message: "Invalid status"
        });
        return;
      }

      const updatedBooking = await BookingModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedBooking) {
        res.status(404).json({
          message: "Booking not found"
        });
        return;
      }

      res.json({
        message: "Booking status updated successfully",
        booking: updatedBooking
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update booking status",
        error
      });
    }
  }
}