import { prisma } from "../config/database";

async function findById(id: number) {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  return user;
}

const userRepository = {
  findById,
};

export default userRepository;
