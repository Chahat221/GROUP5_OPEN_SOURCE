import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export class TokenService {

  static generateAccessToken(user: any) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user"
      },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );
  }

  static generateRefreshToken(user: any) {
    return jwt.sign(
      {
        id: user.id
      },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET);
  }
}