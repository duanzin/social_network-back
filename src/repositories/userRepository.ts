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

async function findAllUsers(userId: number) {
  const user = await prisma.users.findMany({
    where: {
      id: {
        not: userId,
      },
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

export default {
  findById,
  findAllUsers,
};
