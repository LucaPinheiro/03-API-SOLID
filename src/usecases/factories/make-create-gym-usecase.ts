import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUsecase } from "../create-gym";

export function makeCreateGymUsecase() {
  const gymsRepository = new PrismaGymsRepository();
  const usecase = new CreateGymUsecase(gymsRepository);

  return usecase;
}
