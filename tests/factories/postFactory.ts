import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import { posts } from "@prisma/client";

export async function createPost(userId: number): Promise<posts> {
  return prisma.posts.create({
    data: {
      userId: userId || faker.number.int(),
      content: faker.lorem.sentence(),
    },
  });
}
