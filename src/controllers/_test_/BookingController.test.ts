import { BookingController } from "../BookingController";

describe("BookingController", () => {
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

  test("should create booking", () => {
    req.body = {
      userName: "Admin",
      eventName: "Tech Workshop",
      date: "2026-04-25",
      time: "2:00 PM",
      seats: 2
    };

    BookingController.create(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("should get all bookings", () => {
    BookingController.getAll(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("should update existing booking status", () => {
    req.body = {
      userName: "Admin",
      eventName: "Tech Workshop",
      date: "2026-04-25",
      time: "2:00 PM",
      seats: 2
    };

    BookingController.create(req, res);

    const createdBooking = res.json.mock.calls[0][0].booking;

    req.params = { id: createdBooking.id };
    req.body = { status: "confirmed" };

    BookingController.updateStatus(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Status updated"
      })
    );
  });

  test("should return 404 when updating missing booking", () => {
    req.params = { id: "fake-id" };
    req.body = { status: "confirmed" };

    BookingController.updateStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should cancel existing booking", () => {
    req.body = {
      userName: "Admin",
      eventName: "Tech Workshop",
      date: "2026-04-25",
      time: "2:00 PM",
      seats: 2
    };

    BookingController.create(req, res);

    const createdBooking = res.json.mock.calls[0][0].booking;

    req.params = { id: createdBooking.id };

    BookingController.cancel(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Booking cancelled"
      })
    );
  });

  test("should return 404 when cancelling missing booking", () => {
    req.params = { id: "fake-id" };

    BookingController.cancel(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});