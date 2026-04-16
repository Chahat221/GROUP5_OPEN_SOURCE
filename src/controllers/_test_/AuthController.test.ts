import { AuthController } from "../AuthController";

describe("AuthController", () => {
  it("should return 401 for invalid credentials", () => {
    const req: any = {
      body: {
        email: "wrong@test.com",
        password: "wrongpass"
      }
    };

    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid credentials"
    });
  });
});