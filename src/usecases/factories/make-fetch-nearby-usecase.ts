import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUsecase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUsecase() {
  const gymsRepository = new PrismaGymsRepository();
  const usecase = new FetchNearbyGymsUsecase(gymsRepository);

  return usecase;
}
