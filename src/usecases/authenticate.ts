import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUsecaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUsecaseResponse {
  user: User;
}

export class AuthenticateUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUsecaseRequest): Promise<AuthenticateUsecaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    console.log(user);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
