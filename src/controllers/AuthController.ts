import { Request, Response } from "express";
import { RegisterUser } from "../application/use-cases/RegisterUser";
import { TokenService } from "../infrastructure/auth/TokenService";
import { User } from "../domain/entities/user";

const users: User[] = [];
const refreshTokens: string[] = [];

export class AuthController {

  static register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const registerUser = new RegisterUser();
    const newUser = registerUser.execute(name, email, password);

    users.push(newUser);

    res.json({
      message: "User registered successfully",
      user: newUser
    });
  }

  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const accessToken = TokenService.generateAccessToken(user);
    const refreshToken = TokenService.generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user
    });
  }

  static refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.status(403).json({
        message: "Invalid refresh token"
      });
    }

    try {
      const decoded: any = TokenService.verifyRefreshToken(refreshToken);

      const newAccessToken = TokenService.generateAccessToken({
        id: decoded.id,
        role: "user"
      });

      res.json({
        accessToken: newAccessToken
      });
    } catch {
      return res.status(403).json({
        message: "Token expired"
      });
    }
  }

  static logout(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const index = refreshTokens.indexOf(refreshToken);

    if (index !== -1) {
      refreshTokens.splice(index, 1);
    }

    res.json({
      message: "Logged out successfully"
    });
  }
}