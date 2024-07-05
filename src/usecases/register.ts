import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUsecaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUsecaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
