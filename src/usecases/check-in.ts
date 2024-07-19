import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUsecaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUsecaseResponse {
  checkIn: CheckIn;
}

export class CheckInUsecase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUsecaseRequest): Promise<CheckInUsecaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
