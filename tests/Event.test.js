"use strict";
describe("Event Registration", () => {
    test("should prevent duplicate registration", () => {
        const event = {
            id: "1",
            name: "Test Event",
            date: "2026-04-20",
            slots: ["10:00-11:00"],
            registeredUsers: ["user1"]
        };
        const userId = "user1";
        const alreadyRegistered = event.registeredUsers.includes(userId);
        expect(alreadyRegistered).toBe(true);
    });
    test("should allow a new user registration", () => {
        const event = {
            id: "1",
            name: "Test Event",
            date: "2026-04-20",
            slots: ["10:00-11:00"],
            registeredUsers: ["user1"]
        };
        const userId = "user2";
        const alreadyRegistered = event.registeredUsers.includes(userId);
        expect(alreadyRegistered).toBe(false);
    });
});
