import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
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

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "matue@30praum.com",
      })
    );
  });
});
