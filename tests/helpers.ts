import * as jwt from "jsonwebtoken";
import { users } from "@prisma/client";
import { prisma } from "../src/config/database";
import { createUser } from "./factories/userFactory";

export async function cleanDb() {
  await prisma.posts.deleteMany({});
  await prisma.relationships.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}
