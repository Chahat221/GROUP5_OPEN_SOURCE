import jwt from "jsonwebtoken";

const getAccessSecret = () => process.env.ACCESS_TOKEN_SECRET as string;
const getRefreshSecret = () => process.env.REFRESH_TOKEN_SECRET as string;

export class TokenService {
  static generateAccessToken(user: any) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user"
      },
      getAccessSecret(),
      { expiresIn: "15m" }
    );
  }

  static generateRefreshToken(user: any) {
    return jwt.sign(
      {
        id: user.id
      },
      getRefreshSecret(),
      { expiresIn: "7d" }
    );
  }
}