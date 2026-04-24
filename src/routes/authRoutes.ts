import express from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);


router.get("/profile", authenticateToken, AuthController.profile);

export default router;