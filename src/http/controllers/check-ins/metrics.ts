import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUsecase } from "@/usecases/factories/make-get-user-metrics-usecase";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUsecase = makeGetUserMetricsUsecase();

  const { checkInsCount } = await getUserMetricsUsecase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
