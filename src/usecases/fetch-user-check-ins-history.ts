import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUsecaseRequest {
  userId: string;
}
interface FetchUserCheckInsHistoryUsecaseResponse {
  checkIns: CheckIn[];
}
export class FetchUserCheckInsHistoryUsecase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: FetchUserCheckInsHistoryUsecaseRequest): Promise<FetchUserCheckInsHistoryUsecaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);
    return {
      checkIns,
    };
  }
}
