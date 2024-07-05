import { expect, describe, it } from "vitest";
import { RegisterUsecase } from "./register";
import { compare } from "bcryptjs";

describe("Register Usecase", () => {
  it("should hash user password upon registration", async () => {
    const registerUsecase = new RegisterUsecase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUsecase.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHash = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHash).toBe(true);
  });
});
