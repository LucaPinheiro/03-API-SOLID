import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUsecase } from "@/usecases/factories/make-validate-check-in-usecase";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUsecase = makeValidateCheckInUsecase();

  await validateCheckInUsecase.execute({
    checkInId,
  });

  return reply.status(204).send({ message: "Check-In validated" });
}
