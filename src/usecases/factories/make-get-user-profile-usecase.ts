import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUsecase } from "../get-user-profile";

export function makeGetUserProfileUsecase() {
  const usersRepository = new PrismaUsersRepository();
  const usecase = new GetUserProfileUsecase(usersRepository);

  return usecase;
}
