import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send();
}
