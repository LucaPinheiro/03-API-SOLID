import { SearchGymsUsecase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUsecase() {
  const gymsRepository = new PrismaGymsRepository();
  const usecase = new SearchGymsUsecase(gymsRepository);

  return usecase;
}
