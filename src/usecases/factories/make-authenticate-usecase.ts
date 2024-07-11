import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUsecase } from "../authenticate";

export function makeAuthenticateUsecase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUsecase = new AuthenticateUsecase(prismaUsersRepository);

  return authenticateUsecase;
}
