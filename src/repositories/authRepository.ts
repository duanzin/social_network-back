import { CreateUserParams } from "../protocols/authProtocols";
import { prisma } from "../config/database";

async function findByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function create(data: CreateUserParams) {
  await prisma.users.create({
    data,
  });
}

const authRepository = {
  findByEmail,
  create,
};

export default authRepository;
