import { users } from "@prisma/client";

export type CreateUserParams = Omit<
  users,
  "id" | "banner" | "createdAt" | "updatedAt"
> & {
  pfp?: string;
  slug?: string;
};

export type SigninParams = Pick<users, "email" | "password">;
