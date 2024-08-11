import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "Matuê",
    email: "matue@30praum.com",
    password: "333sóEm2053",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "matue@30praum.com",
    password: "333sóEm2053",
  });

  const { token } = authResponse.body;

  return { token };
}
