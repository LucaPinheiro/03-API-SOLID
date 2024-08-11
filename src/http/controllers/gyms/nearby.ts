import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUsecase } from "@/usecases/factories/make-create-gym-usecase";
import { SearchGymsUsecase } from "@/usecases/search-gyms";
import { makeSearchGymsUsecase } from "@/usecases/factories/make-search-gyms-usecase";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUsecase = makeSearchGymsUsecase();

  const { gyms } = await searchGymsUsecase.execute({
    query: q,
    page,
  });

  return reply.status(201).send({ gyms });
}
