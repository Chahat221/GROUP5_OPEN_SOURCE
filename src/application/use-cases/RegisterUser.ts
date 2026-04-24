import { User } from "../../domain/entities/user";

export class RegisterUser {
  execute(name: string, email: string, password: string): User {
    return {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user" // default
    };
  }
}