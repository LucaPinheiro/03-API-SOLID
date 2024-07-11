import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUsecase } from "@/usecases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/usecases/errors/user-already-exists-error";
import { makeRegisterUsecase } from "@/usecases/factories/make-register-usecase";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUsecase = makeRegisterUsecase();

    await registerUsecase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({ message: "User created" });
}
