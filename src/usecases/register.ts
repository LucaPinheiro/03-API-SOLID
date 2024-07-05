import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUsecaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUsecase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({ name, email, password }: RegisterUsecaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("User with same email already exists");
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
