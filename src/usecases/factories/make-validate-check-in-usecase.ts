import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUsecase } from "../validate-check-in";

export function makeValidateCheckInUsecase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const usecase = new ValidateCheckInUsecase(checkInsRepository);

  return usecase;
}
