import { prisma } from "../config/database";

async function findFollowers(userId: number) {
  return await prisma.relationships.findMany({
    where: {
      followedId: userId,
      followerId: { not: userId },
    },
  });
}

async function findFollowing(userId: number) {
  return await prisma.relationships.findMany({
    where: {
      followerId: userId,
    },
  });
}

async function findRelationship(followerId: number, followedId: number) {
  return await prisma.relationships.findFirst({
    where: {
      followerId,
      followedId,
    },
  });
}

async function unfollow(id: number) {
  await prisma.relationships.delete({
    where: {
      id,
    },
  });
}

async function follow(followerId: number, followedId: number) {
  return await prisma.relationships.create({
    data: {
      followerId,
      followedId,
    },
  });
}

export default {
  findRelationship,
  findFollowers,
  findFollowing,
  unfollow,
  follow,
};
