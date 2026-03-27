import { User } from "../../domain/entities/user";

export class RegisterUser {
  execute(name: string, email: string, password: string): User {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user"
    };

    return newUser;
  }
}