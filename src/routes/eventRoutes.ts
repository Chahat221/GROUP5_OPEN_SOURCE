import express from "express";
import { EventController } from "../controllers/EventController";

const router = express.Router();

router.post("/", EventController.create);
router.get("/", EventController.getAll);

export default router;