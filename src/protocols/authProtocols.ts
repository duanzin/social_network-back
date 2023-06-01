import { users } from "@prisma/client";

export type CreateUserParams = Omit<users, "id" | "createdAt" | "updatedAt">;
export type SigninParams = Pick<users, "email" | "password">;
