import { RegisterUser } from "../RegisterUser";

describe("RegisterUser", () => {
  it("should create a new user", () => {
    const registerUser = new RegisterUser();

    const user = registerUser.execute("Sania", "sania@test.com", "123");

    expect(user).toBeDefined();
    expect(user.name).toBe("Sania");
    expect(user.email).toBe("sania@test.com");
    expect(user.password).toBe("123");
  });
});