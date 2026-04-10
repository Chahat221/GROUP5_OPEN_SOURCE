import express from "express";
import { AuthController } from "./controllers/AuthController";
import { BookingController } from "./controllers/BookingController";
<<<<<<< HEAD
import { EventController } from "./controllers/EventController";
=======
import { EventController } from "./controllers/EventController";

>>>>>>> 0bd8cf7e5b074ba98d5501d63a648ae6b6aefa6b
const app = express();

app.use(express.json());

// Authentication routes
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Booking routes
app.post("/bookings", BookingController.create);
app.get("/bookings", BookingController.getAll);
app.delete("/bookings/:id", BookingController.cancel);
<<<<<<< HEAD
app.post("/events", EventController.create);
app.get("/events", EventController.getAll);
=======
app.patch("/bookings/:id/status", BookingController.updateStatus);
>>>>>>> 0bd8cf7e5b074ba98d5501d63a648ae6b6aefa6b

// Event routes
app.post("/events", EventController.create);
app.get("/events", EventController.getAll);
app.post("/events/:id/register", EventController.registerUser);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});