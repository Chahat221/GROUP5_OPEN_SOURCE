import { Request, Response } from "express";
import { EventModel } from "../infrastructure/database/models/EventModel";

export class EventController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, date, slots } = req.body;

      const newEvent = await EventModel.create({
        name,
        date,
        slots,
        registeredUsers: []
      });

      res.status(201).json({
        message: "Event created successfully",
        event: newEvent
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create event",
        error
      });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const events = await EventModel.find();

      res.json(events);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch events",
        error
      });
    }
  }

  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      const event = await EventModel.findById(id);

      if (!event) {
        res.status(404).json({
          message: "Event not found"
        });
        return;
      }

      if (event.registeredUsers.includes(userId)) {
        res.status(400).json({
          message: "User already registered for this event"
        });
        return;
      }

      event.registeredUsers.push(userId);
      await event.save();

      res.json({
        message: "User registered for event successfully",
        event
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to register user for event",
        error
      });
    }
  }
}