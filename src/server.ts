import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import eventRoutes from "./routes/eventRoutes";

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

// Routes
app.use("/", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/events", eventRoutes);

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