import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUsecase } from "../create-gym";

export function makeCrateGymUsecase() {
  const gymsRepository = new PrismaGymsRepository();
  const usecase = new CreateGymUsecase(gymsRepository);

  return usecase;
}
