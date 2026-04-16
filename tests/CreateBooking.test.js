"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateBooking_1 = require("../src/application/use-cases/CreateBooking");
describe("CreateBooking", () => {
    test("should create booking if slot is free", () => {
        const createBooking = new CreateBooking_1.CreateBooking();
        const bookings = [];
        const result = createBooking.execute("1", "Haircut", "2026-04-20", "10:00", "11:00", bookings);
        expect(result).not.toBeNull();
        expect(result === null || result === void 0 ? void 0 : result.status).toBe("pending");
    });
    test("should prevent double booking", () => {
        const createBooking = new CreateBooking_1.CreateBooking();
        const bookings = [
            {
                id: "1",
                userId: "1",
                service: "Haircut",
                date: "2026-04-20",
                startTime: "10:00",
                endTime: "11:00",
                status: "pending"
            }
        ];
        const result = createBooking.execute("2", "Haircut", "2026-04-20", "10:00", "11:00", bookings);
        expect(result).toBeNull();
    });
});
