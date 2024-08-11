import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUsecase } from "@/usecases/factories/make-create-gym-usecase";
import { SearchGymsUsecase } from "@/usecases/search-gyms";
import { makeSearchGymsUsecase } from "@/usecases/factories/make-search-gyms-usecase";
import { makeFetchNearbyGymsUsecase } from "@/usecases/factories/make-fetch-nearby-usecase";
import { makeFetchUserCheckInHistoryUsecase } from "@/usecases/factories/make-fetch-user-check-ins-usecase";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(
    request.query
  );

  const checkInHistoryUsecase = makeFetchUserCheckInHistoryUsecase();

  const { checkIns } = await checkInHistoryUsecase.execute({
    userId: request.user.sub, 
    page,
  });

  return reply.status(201).send({ checkIns });
}
