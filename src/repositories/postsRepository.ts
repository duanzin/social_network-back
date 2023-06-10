import { prisma } from "../config/database";

async function getAll() {
  return await prisma.posts.findMany();
}

async function getFromUser(id: number) {
  return await prisma.posts.findMany({
    where: {
      userId: id,
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
  create
};
