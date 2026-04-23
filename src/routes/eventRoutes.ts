import express from "express";
import { EventController } from "../controllers/EventController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, EventController.create);
router.get("/", authenticate, EventController.getAll);
router.post("/:id/register", authenticate, EventController.registerUser);

export default router;