import { users } from "@prisma/client";

export type CreateUserParams = Omit<users, "id" | "createdAt" | "updatedAt"> & {
  pfp?: string;
};

export type SigninParams = Pick<users, "email" | "password">;
