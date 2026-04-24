import { Request, Response } from "express";
import { TokenService } from "../infrastructure/auth/TokenService";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  refreshToken?: string;
}

const users: User[] = [];

export class AuthController {

  // ✅ REGISTER
  static register(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: role || "user"
    };

    users.push(newUser);

    res.json({
      message: "User registered successfully",
      user: newUser
    });
  }

  // ✅ LOGIN
  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = TokenService.generateAccessToken(user);
    const refreshToken = TokenService.generateRefreshToken(user);

    user.refreshToken = refreshToken;

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user
    });
  }

  // ✅ REFRESH TOKEN
  static refresh(req: Request, res: Response) {
    const { token } = req.body;

    const user = users.find(u => u.refreshToken === token);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = TokenService.generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  }

  // ✅ LOGOUT
  static logout(req: Request, res: Response) {
    const { token } = req.body;

    const user = users.find(u => u.refreshToken === token);

    if (user) {
      user.refreshToken = undefined;
    }

    res.json({ message: "Logged out successfully" });
  }
}