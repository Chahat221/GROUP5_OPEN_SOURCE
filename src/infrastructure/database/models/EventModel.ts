import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  date: string;
  slots: string[];
  registeredUsers: string[];
}

const EventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    slots: {
      type: [String],
      required: true
    },
    registeredUsers: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);