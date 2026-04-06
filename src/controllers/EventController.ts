import { Request, Response } from "express";
import { Event } from "../domain/entities/Event";

const events: Event[] = [];

export class EventController {
  static create(req: Request, res: Response) {
    const { name, date, slots } = req.body;

    const newEvent: Event = {
      id: Date.now().toString(),
      name,
      date,
      slots,
      registeredUsers: []
    };

    events.push(newEvent);

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  }

  static getAll(req: Request, res: Response) {
    res.json(events);
  }

  static registerUser(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;

    const event = events.find((e) => e.id === id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.registeredUsers.includes(userId)) {
      return res.status(400).json({
        message: "User already registered for this event"
      });
    }

    event.registeredUsers.push(userId);

    res.json({
      message: "User registered for event successfully",
      event
    });
  }
}