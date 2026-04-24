import { AuthController } from "../AuthController";

describe("AuthController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    process.env.ADMIN_EMAIL = "admin@test.com";
    process.env.ADMIN_PASSWORD = "admin123";
    process.env.ACCESS_TOKEN_SECRET = "testAccessSecret";
    process.env.REFRESH_TOKEN_SECRET = "testRefreshSecret";

    req = {
      body: {},
      user: {}
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test("should register user", () => {
    req.body = {
      name: "Test User",
      email: "testuser@test.com",
      password: "123456"
    };

    AuthController.register(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("should login admin successfully", () => {
    req.body = {
      email: "admin@test.com",
      password: "admin123"
    };

    AuthController.login(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test("should return invalid credentials for wrong login", () => {
    req.body = {
      email: "wrong@test.com",
      password: "wrong"
    };

    AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should access profile", () => {
    req.user = {
      id: "admin",
      role: "admin"
    };

    AuthController.profile(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});