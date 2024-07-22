import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchUserCheckInsHistoryUsecase } from "./fetch-user-check-ins-history";
let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUsecase;
describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUsecase(checkInsRepository);
  });

  it("should be able to fetch check in history", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
    });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
});