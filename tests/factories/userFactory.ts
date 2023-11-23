import { prisma } from "../../src/config/database";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { users } from "@prisma/client";

export async function createUser(params: Partial<users> = {}): Promise<users> {
  const incomingPassword =
    params.password || faker.internet.password({ length: 6 });
  const hashedPassword = await bcrypt.hash(incomingPassword, 11);

  const userName = faker.internet.userName();
  const slug = userName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

  return prisma.users.create({
    data: {
      name: faker.internet.displayName(),
      userName,
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      pfp: faker.internet.avatar(),
      banner: faker.image.urlLoremFlickr(),
      slug,
    },
  });
}
