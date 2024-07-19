import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUsecase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUsecase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUsecase;

describe("Check-in Usecase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUsecase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
