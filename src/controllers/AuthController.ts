import { TokenService } from "../infrastructure/auth/TokenService";

const accessToken = TokenService.generateAccessToken(user);
const refreshToken = TokenService.generateRefreshToken(user);

res.json({
  message: "Login successful",
  accessToken,
  refreshToken,
  user
});