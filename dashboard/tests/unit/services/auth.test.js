import AuthService from "@/services/auth";
import mockAxios from "axios";

vi.mock("axios");

describe("AuthService", () => {
  it("should return a token when login is successful", async () => {
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token: "123.123" } });
    });

    const response = await AuthService(mockAxios).login({
      email: "john@doe.com",
      password: "pass@123",
    });
    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it("should return an user when user register", async () => {
    const user = {
      name: "John Doe",
      email: "john@doe.com",
      password: "pass@123",
    };
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user });
    });

    const response = await AuthService(mockAxios).register(user);
    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("password");
    expect(response.data).toHaveProperty("email");
    expect(response).toMatchSnapshot();
  });

  it("should throw an error when not found", async () => {
    const errors = { status: 404, statusText: "Not Found" };
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors });
    });

    const response = await AuthService(mockAxios).login({
      email: "john@doe.com",
      password: "pass@123",
    });
    expect(response.errors).toHaveProperty("status");
    expect(response.errors).toHaveProperty("statusText");
  });
});
