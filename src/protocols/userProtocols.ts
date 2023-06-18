import { users } from "@prisma/client";

export type UserParams = Omit<users, "password" | "email"> & {
  profileOwner: boolean;
  followers: number;
  following: number;
};
