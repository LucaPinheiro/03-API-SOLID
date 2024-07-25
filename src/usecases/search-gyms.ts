import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";
import { Gym } from "@prisma/client";
import { hash } from "bcryptjs";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUsecaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUsecaseResponse {
  gyms: Gym[];
}

export class SearchGymsUsecase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUsecaseRequest): Promise<SearchGymsUsecaseResponse> {
    const gyms = await this.gymsRepository.SearchMany(query, page);

    return {
      gyms,
    };
  }
}
