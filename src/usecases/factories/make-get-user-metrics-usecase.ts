import { GetUserMetricsUsecase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsUsecase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const usecase = new GetUserMetricsUsecase(checkInsRepository);

  return usecase;
}
