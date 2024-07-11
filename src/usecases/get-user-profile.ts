import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/usecases/errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUsecaseRequest {
  userId: string;
}

interface GetUserProfileUsecaseResponse {
  user: User;
}

export class GetUserProfileUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUsecaseRequest): Promise<GetUserProfileUsecaseResponse> {
    const user = await this.usersRepository.findById(userId);
    console.log(user);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
