import { users } from "@prisma/client";

export type UserParams = Omit<
  users,
  "password" | "email" | "updatedAt"
> & {
  profileOwner: boolean;
  followers: number;
  following: number;
};
