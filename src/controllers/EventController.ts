import { Request, Response } from "express";

const events: any[] = [];

export class EventController {
  static create(req: Request, res: Response) {
    const newEvent = {
      id: Date.now().toString(),
      ...req.body
    };

    events.push(newEvent);

    return res.json({
      message: "Event created successfully",
      event: newEvent
    });
  }

  static getAll(req: Request, res: Response) {
    return res.json({
      message: "Events fetched successfully",
      events
    });
  }
}