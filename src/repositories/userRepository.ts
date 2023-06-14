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

const userRepository = {
  findById,
  findAll
};

export default userRepository;
