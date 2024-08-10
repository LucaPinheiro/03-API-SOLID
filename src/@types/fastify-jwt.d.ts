import fastifyJwt from "@fastify/jwt";

declare module "fastify" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
