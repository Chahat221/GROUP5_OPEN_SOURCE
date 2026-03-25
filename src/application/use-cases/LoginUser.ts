import { User } from "../../domain/entities/user";

export class LoginUser {
  execute(email: string, password: string, users: User[]): User | null {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    return foundUser || null;
  }
}