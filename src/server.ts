import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { AuthController } from "./controllers/AuthController";
import { BookingController } from "./controllers/BookingController";
import { EventController } from "./controllers/EventController";

dotenv.config({ path: ".env.development" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Authentication routes
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Booking routes
app.post("/bookings", BookingController.create);
app.get("/bookings", BookingController.getAll);
app.delete("/bookings/:id", BookingController.cancel);
app.patch("/bookings/:id/status", BookingController.updateStatus);

// Event routes
app.post("/events", EventController.create);
app.get("/events", EventController.getAll);
app.post("/events/:id/register", EventController.registerUser);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();