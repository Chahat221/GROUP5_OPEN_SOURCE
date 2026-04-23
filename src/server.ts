import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { AuthController } from "./controllers/AuthController";
import { BookingController } from "./controllers/BookingController";
import { EventController } from "./controllers/EventController";
import { authenticate, authorizeAdmin } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Auth
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.post("/refresh-token", AuthController.refreshToken);
app.post("/logout", AuthController.logout);

// Booking (protected)
app.post("/bookings", authenticate, BookingController.create);
app.get("/bookings", authenticate, BookingController.getAll);
app.delete("/bookings/:id", authenticate, BookingController.cancel);
app.put("/bookings/:id/status", authenticate, BookingController.updateStatus);

// Events (protected)
app.post("/events", authenticate, EventController.create);
app.get("/events", authenticate, EventController.getAll);
app.post("/events/:id/register", authenticate, EventController.registerUser);

// Admin route
app.get("/admin", authenticate, authorizeAdmin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

const PORT = 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();