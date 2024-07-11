import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUsecase } from "../register";

export function makeRegisterUsecase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUsecase = new RegisterUsecase(prismaUsersRepository);

  return registerUsecase;
}
