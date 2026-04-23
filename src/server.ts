import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { AuthController } from "./controllers/AuthController";
import { BookingController } from "./controllers/BookingController";
import { EventController } from "./controllers/EventController";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.get("/bookings", authenticate, BookingController.getAll);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is working",
    time: new Date().toISOString()
  });
});

// Authentication routes
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Booking routes
app.post("/bookings", BookingController.create);
app.get("/bookings", BookingController.getAll);
app.delete("/bookings/:id", BookingController.cancel);
app.put("/bookings/:id/status", BookingController.updateStatus);

// Event routes
app.post("/events", EventController.create);
app.get("/events", EventController.getAll);
app.post("/events/:id/register", EventController.registerUser);

const PORT = 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();