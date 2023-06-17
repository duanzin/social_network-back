import { users, relationships } from "@prisma/client";

export type UserParams = Omit<users, "password" | "email"> & {
  relationships: relationships[];
};
