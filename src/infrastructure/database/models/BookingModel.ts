import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "accepted" | "declined";
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);