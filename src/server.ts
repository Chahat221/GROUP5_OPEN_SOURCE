import express from "express";
import { AuthController } from "./controllers/AuthController";
import { BookingController } from "./controllers/BookingController";
import { EventController } from "./controllers/EventController";
const app = express();

app.use(express.json());

// Authentication routes
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Booking routes
app.post("/bookings", BookingController.create);
app.get("/bookings", BookingController.getAll);
app.delete("/bookings/:id", BookingController.cancel);
app.post("/events", EventController.create);
app.get("/events", EventController.getAll);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});