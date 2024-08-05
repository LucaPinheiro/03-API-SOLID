import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUsecaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUsecaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUsecase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUsecaseRequest): Promise<FetchNearbyGymsUsecaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
