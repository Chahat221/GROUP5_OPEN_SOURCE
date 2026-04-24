import jwt from "jsonwebtoken";

export class TokenService {
  static generateAccessToken(user: any) {
    return jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );
  }

  static generateRefreshToken(user: any) {
    return jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
  }
}