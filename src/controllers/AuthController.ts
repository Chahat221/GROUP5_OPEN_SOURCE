import { Request, Response } from "express";
import { TokenService } from "../infrastructure/auth/TokenService";

const users: any[] = [];

export class AuthController {
  static register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user"
    };

    users.push(newUser);

    return res.json({
      message: "User registered successfully",
      user: newUser
    });
  }

  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminUser = {
        id: "admin",
        name: "Admin",
        email,
        role: "admin"
      };

      return res.json({
        message: "Admin login successful",
        accessToken: TokenService.generateAccessToken(adminUser),
        refreshToken: TokenService.generateRefreshToken(adminUser),
        user: adminUser
      });
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      accessToken: TokenService.generateAccessToken(user),
      refreshToken: TokenService.generateRefreshToken(user),
      user
    });
  }

  static profile(req: Request, res: Response) {
    return res.json({
      message: "Protected profile accessed",
      user: (req as any).user
    });
  }
}