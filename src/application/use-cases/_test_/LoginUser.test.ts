import { LoginUser } from "../LoginUser";

describe("LoginUser", () => {
  it("should return null for invalid credentials", () => {
    const loginUser = new LoginUser();

    const result = loginUser.execute("wrong@test.com", "123");

    expect(result).toBeNull();
  });
});