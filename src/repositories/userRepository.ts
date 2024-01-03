import { prisma } from "../config/database";

async function findById(userId: number) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      userName: true,
      pfp: true,
      banner: true,
      slug: true,
      createdAt: true,
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
      userName: true,
      pfp: true,
      banner: true,
      slug: true,
      createdAt: true,
    },
  });

  return user;
}

async function findBySlug(slug: string) {
  const user = await prisma.users.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      userName: true,
      pfp: true,
      banner: true,
      slug: true,
      createdAt: true,
    },
  });

  return user;
}

export default {
  findById,
  findAllUsers,
  findBySlug,
};
