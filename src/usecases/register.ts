import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUsecaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUsecaseResponse {
  user: User;
}

export class RegisterUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUsecaseRequest): Promise<RegisterUsecaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
