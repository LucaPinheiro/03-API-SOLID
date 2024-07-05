import { expect, describe, it } from "vitest";
import { RegisterUsecase } from "./register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { compare } from "bcryptjs";

describe("Register Usecase", () => {
  it("should hash user password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUsecase = new RegisterUsecase(prismaUsersRepository);

    const { user } = await registerUsecase.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHash = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHash).toBe(true);
  });
});
