import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it } from "vitest";
import { RegisterUsecase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

describe("Register Usecase", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUsecase(usersRepository);

    const { user } = await registerUsecase.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHash = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHash).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUsecase(usersRepository);

    const email = "matheus30praum@gmail.com";

    await registerUsecase.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    expect(() =>
      registerUsecase.execute({
        name: "Matue",
        email: "matheus30praum@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUsecase = new RegisterUsecase(usersRepository);

    const { user } = await registerUsecase.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
