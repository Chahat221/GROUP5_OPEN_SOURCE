<<<<<<< HEAD
import { User } from "../domain/entities/user";

=======
import { User } from "../../domain/entities/user";

>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70
export class RegisterUser {
  execute(name: string, email: string, password: string): User {
    const newUser: User = {
<<<<<<< HEAD
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
=======
      id: Date.now().toString(),
      name,
      email,
      password,
>>>>>>> 3dd44ace3f2ba210f267f9b2a348466d5ecebf70
      role: "user"
    };

    return newUser;
  }
}