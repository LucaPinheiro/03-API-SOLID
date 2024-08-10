import { FetchUserCheckInsHistoryUsecase } from "../fetch-user-check-ins-history";
import { GetUserMetricsUsecase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInHistoryUsecase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const usecase = new FetchUserCheckInsHistoryUsecase(checkInsRepository);

  return usecase;
}
