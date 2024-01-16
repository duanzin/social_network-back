import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import { posts } from "@prisma/client";
import { createUser } from "./userFactory";

export async function createPost(userId: number = null): Promise<posts> {
  if (userId === null) {
    const { id } = await createUser();
    userId = id;
  }
  const post = await prisma.posts.create({
    data: {
      userId: userId,
      content: faker.lorem.sentence(),
    },
  });

  await prisma.likes.create({
    data: {
      userId: userId,
      postId: post.id,
    },
  });

  await prisma.retweets.create({
    data: {
      userId: userId,
      postId: post.id,
    },
  });

  return post;
}
