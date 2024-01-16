import { prisma } from "../src/config/database";
import * as jwt from "jsonwebtoken";
import { users } from "@prisma/client";
import { createUser } from "./factories/userFactory";

export async function cleanDb() {
  await prisma.likes.deleteMany({});
  await prisma.retweets.deleteMany({});
  await prisma.posts.deleteMany({});
  await prisma.relationships.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const { id } = user || (await createUser());
  const token: string = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 1800,
  });

  return token;
}
