import express from "express";
import { BookingController } from "../controllers/BookingController";

const router = express.Router();

router.post("/", BookingController.create);
router.get("/", BookingController.getAll);
router.put("/:id/status", BookingController.updateStatus);
router.delete("/:id", BookingController.cancel);

export default router;