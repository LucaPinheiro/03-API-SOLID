import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUsecaseRequest {
  userId: string;
  page: number;
}
interface FetchUserCheckInsHistoryUsecaseResponse {
  checkIns: CheckIn[];
}
export class FetchUserCheckInsHistoryUsecase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUsecaseRequest): Promise<FetchUserCheckInsHistoryUsecaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);
    return {
      checkIns,
    };
  }
}
