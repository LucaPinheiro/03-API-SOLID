import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInUsecase } from "../check-in";

export function makeCheckInUsecase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const GymsRepository = new PrismaGymsRepository()
  const usecase = new CheckInUsecase(checkInsRepository, GymsRepository);

  return usecase;
}
