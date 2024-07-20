import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";
import { Gym } from "@prisma/client";
import { hash } from "bcryptjs";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUsecaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUsecaseResponse {
  gym: Gym;
}

export class CreateGymUsecase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUsecaseRequest): Promise<CreateGymUsecaseResponse> {

    const gym = await this.gymsRepository.create({
        title,
        description,
        phone,
        latitude,
        longitude,
    });

    return {
      gym,
    };
  }
}
