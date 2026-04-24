import { EventController } from "../EventController";

describe("EventController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test("should create event", () => {
    req.body = {
      name: "Tech Workshop",
      date: "2026-04-25",
      location: "Waterloo Campus",
      slots: 20
    };

    EventController.create(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("should get all events", () => {
    EventController.getAll(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});