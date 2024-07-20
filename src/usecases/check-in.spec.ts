import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUsecase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUsecase;

describe("Check-in Usecase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUsecase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    console.log(checkIn.created_at);

    expect(checkIn.created_at).toEqual(expect.any(Date));
    expect(checkIn.id).toEqual(expect.any(String));
  });

  // tdd -> red, green, refactor

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    await expect(
      await sut.execute({
        gymId: "gym-id",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
