import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUsecase } from "./register";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUsecase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUsecase;

describe("Create Gym Usecase", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUsecase(gymsRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "Academia",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
