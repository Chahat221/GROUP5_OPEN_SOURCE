<<<<<<< HEAD
import { Request, Response } from "express";
import { RegisterUser } from "../usecases/RegisterUser";
import { LoginUser } from "../usecases/LoginUser";
=======
import { Request, Response } from "express";
import { RegisterUser } from "../application/use-cases/RegisterUser";
import { LoginUser } from "../application/use-cases/LoginUser";
import { User } from "../domain/entities/user";
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70

const registerUser = new RegisterUser();
const loginUser = new LoginUser();

export class AuthController {
  static register(req: Request, res: Response) {
    const { name, email, password } = req.body;

<<<<<<< HEAD
  static register(req: Request, res: Response) {

    const { name, email, password } = req.body;
=======
    const registerUser = new RegisterUser();
    const newUser = registerUser.execute(name, email, password);
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70

    const user = registerUser.execute(name, email, password);

<<<<<<< HEAD
    res.json({
      message: "User registered successfully",
      user
    });

=======
    res.json({
      message: "User registered successfully",
      user: newUser
    });
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70
  }

<<<<<<< HEAD
  static login(req: Request, res: Response) {
=======
  static login(req: Request, res: Response) {
    const { email, password } = req.body;
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70

<<<<<<< HEAD
    const { email, password } = req.body;
=======
    const loginUser = new LoginUser();
    const user = loginUser.execute(email, password, users);
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70

<<<<<<< HEAD
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
=======
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70

    res.json({
      message: "Login successful",
      user
    });
  }
}