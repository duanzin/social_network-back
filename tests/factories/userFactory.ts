import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { users } from "@prisma/client";
import { prisma } from "../../src/config/database";

export async function createUser(params: Partial<users> = {}): Promise<users> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 11);

  return prisma.users.create({
    data: {
      name: faker.internet.displayName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      pfp: faker.internet.avatar(),
    },
  });
}
