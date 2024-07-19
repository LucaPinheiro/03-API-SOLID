import { CheckIn, Prisma } from "@prisma/client";
import { create } from "domain"

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}