import { RegisterUser } from "../application/use-cases/RegisterUser";
import { LoginUser } from "../application/use-cases/LoginUser";
import { User } from "../domain/entities/user";

const users: User[] = [];

export class AuthController {

  register(name: string, email: string, password: string) {
    const registerUser = new RegisterUser();

    const newUser = registerUser.execute(name, email, password);

    users.push(newUser);

    return newUser;
  }

  login(email: string, password: string) {
    const loginUser = new LoginUser();

    const user = loginUser.execute(email, password, users);

    return user;
  }

}