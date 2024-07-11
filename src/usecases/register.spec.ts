import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUsecase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUsecase;

describe("Register Usecase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUsecase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHash = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHash).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "matheus30praum@gmail.com";

    await sut.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Matue",
        email: "matheus30praum@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Matue",
      email: "matheus30praum@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
