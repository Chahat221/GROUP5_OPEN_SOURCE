import { Request, Response } from "express";
import { RegisterUser } from "../application/use-cases/RegisterUser";
import { LoginUser } from "../application/use-cases/LoginUser";
import { User } from "../domain/entities/user";

const users: User[] = [];

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

    const loginUser = new LoginUser();
    const user = loginUser.execute(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    res.json({
      message: "Login successful",
      user
    });
  }
}