import { users } from "@prisma/client";

export type UserParams = Omit<users, "password" | "email">;