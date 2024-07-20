import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<any>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
