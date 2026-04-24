import { CreateBooking } from "../CreateBooking";
import { Booking } from "../../../domain/entities/Booking";

describe("CreateBooking", () => {
  it("should create a booking when no conflict exists", () => {
    const createBooking = new CreateBooking();

    const existingBookings: Booking[] = [];

    const booking = createBooking.execute(
      "1",
      "haircut",
      "2026-04-20",
      "10:00",
      "11:00",
      existingBookings
    );

    expect(booking).toBeDefined();
    expect(booking?.userId).toBe("1");
    expect(booking?.service).toBe("haircut");
    expect(booking?.status).toBe("pending");
  });

  it("should return null if there is a conflict", () => {
    const createBooking = new CreateBooking();

    const existingBookings: Booking[] = [
      {
        id: "1",
        userId: "2",
        service: "haircut",
        date: "2026-04-20",
        startTime: "10:00",
        endTime: "11:00",
        status: "accepted"
      }
    ];

    const booking = createBooking.execute(
      "1",
      "haircut",
      "2026-04-20",
      "10:00",
      "11:00",
      existingBookings
    );

    expect(booking).toBeNull();
  });
});