import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUsecase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUsecase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUsecase(checkInsRepository)

  return useCase
}