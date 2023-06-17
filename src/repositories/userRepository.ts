import { prisma } from "../config/database";

async function findById(userId: number) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      pfp: true,
    },
  });

  return user;
}

async function findAllUsers() {
  const user = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      pfp: true,
    },
  });

  return user;
}

async function findAllRelationships(userId: number) {
  return await prisma.relationships.findMany({
    where: {
      OR: [{ followedId: userId }, { followerId: userId }],
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

const userRepository = {
  findById,
  findAllUsers,
  findRelationship,
  findAllRelationships,
  findFollowing,
  unfollow,
  follow,
};

export default userRepository;
