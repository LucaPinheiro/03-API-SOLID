import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUsecase } from "@/usecases/factories/make-create-gym-usecase";
import { SearchGymsUsecase } from "@/usecases/search-gyms";
import { makeSearchGymsUsecase } from "@/usecases/factories/make-search-gyms-usecase";
import { makeFetchNearbyGymsUsecase } from "@/usecases/factories/make-fetch-nearby-usecase";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const nearbyGymsUsecase = makeFetchNearbyGymsUsecase();

  const { gyms } = await nearbyGymsUsecase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ gyms });
}
