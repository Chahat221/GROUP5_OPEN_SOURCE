import express from "express";
import { BookingController } from "../controllers/BookingController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, BookingController.create);
router.get("/", authenticate, BookingController.getAll);
router.delete("/:id", authenticate, BookingController.cancel);
router.put("/:id/status", authenticate, BookingController.updateStatus);

export default router;