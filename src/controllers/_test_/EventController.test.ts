import { EventController } from "../EventController";

describe("EventController", () => {

  it("should create an event", async () => {
    const req: any = {
      body: {
        name: "Tech Event",
        date: "2026-04-20",
        slots: 10
      }
    };

    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await EventController.create(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it("should return all events", async () => {
    const req: any = {};
    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await EventController.getAll(req, res); // ✅ YOU MISSED THIS

    expect(res.json).toHaveBeenCalled();
  });

  it("should register user to event", async () => {
    const req: any = {
      params: { id: "1" },
      body: { userId: "1" }
    };

    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await EventController.registerUser(req, res);

    expect(res.json).toHaveBeenCalled();
  });

});