import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

// ✅ IMPORTANT: wrap in arrow function
router.post("/register", (req, res) => AuthController.register(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));

export default router;