import { BookingController } from "../BookingController";
import { BookingModel } from "../../infrastructure/database/models/BookingModel";

jest.mock("../../infrastructure/database/models/BookingModel", () => ({
  BookingModel: {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn()
  }
}));

describe("BookingController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should create a booking successfully", async () => {
    req.body = {
      userId: "1",
      service: "haircut",
      date: "2026-04-20",
      startTime: "10:00",
      endTime: "11:00"
    };

    (BookingModel.findOne as jest.Mock).mockResolvedValue(null);
    (BookingModel.create as jest.Mock).mockResolvedValue({
      id: "1",
      ...req.body,
      status: "pending"
    });

    await BookingController.create(req, res);

    expect(BookingModel.findOne).toHaveBeenCalledWith({
      service: "haircut",
      date: "2026-04-20",
      startTime: "10:00",
      endTime: "11:00"
    });

    expect(BookingModel.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Booking created successfully"
      })
    );
  });

  it("should return 400 if time slot is already booked", async () => {
    req.body = {
      userId: "1",
      service: "haircut",
      date: "2026-04-20",
      startTime: "10:00",
      endTime: "11:00"
    };

    (BookingModel.findOne as jest.Mock).mockResolvedValue({
      id: "existing-booking"
    });

    await BookingController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Time slot already booked"
    });
  });

  it("should return all bookings", async () => {
    const mockBookings = [
      { id: "1", service: "haircut" },
      { id: "2", service: "nails" }
    ];

    (BookingModel.find as jest.Mock).mockResolvedValue(mockBookings);

    await BookingController.getAll(req, res);

    expect(BookingModel.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockBookings);
  });

  it("should cancel a booking", async () => {
    req.params = { id: "1" };

    (BookingModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      id: "1",
      service: "haircut"
    });

    await BookingController.cancel(req, res);

    expect(BookingModel.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking cancelled successfully",
      booking: { id: "1", service: "haircut" }
    });
  });

  it("should update booking status", async () => {
    req.params = { id: "1" };
    req.body = { status: "accepted" };

    (BookingModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      id: "1",
      status: "accepted"
    });

    await BookingController.updateStatus(req, res);

    expect(BookingModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { status: "accepted" },
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "Booking status updated successfully",
      booking: { id: "1", status: "accepted" }
    });
  });

  it("should return 400 for invalid status", async () => {
    req.params = { id: "1" };
    req.body = { status: "pending" };

    await BookingController.updateStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid status"
    });
  });
});