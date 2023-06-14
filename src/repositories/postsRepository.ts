import { prisma } from "../config/database";

async function getAll() {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
        },
      },
    },
  });
}

async function getFromUser(id: number) {
  return await prisma.posts.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
        },
      },
    },
  });
}

async function create(id: number, content: string) {
  await prisma.posts.create({
    data: {
      userId: id,
      content,
    },
  });
}

export default {
  getAll,
  getFromUser,
  create,
};
