import { prisma } from "../config/database";

async function findById(id: number) {
  const user = await prisma.users.findUnique({
    where: {
      id,
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

async function findAll() {
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
  await prisma.relationships.create({
    data: {
      followerId,
      followedId,
    },
  });
}

const userRepository = {
  findById,
  findAll,
  findRelationship,
  unfollow,
  follow,
};

export default userRepository;
