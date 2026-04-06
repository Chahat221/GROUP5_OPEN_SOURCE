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
      slots
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

}