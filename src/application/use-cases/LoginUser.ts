import { User } from "../../domain/entities/user";

export class LoginUser {
  execute(email: string, password: string): User | null {
    if (email === "test@test.com" && password === "123456") {
      return {
        id: "1",
        name: "Test User",
        email,
        password,
        role: "user"
      };
    }

    return null;
  }
}