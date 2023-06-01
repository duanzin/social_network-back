import { CreateUserParams } from "../protocols/authProtocols";
import { prisma } from "../config/database";

async function findByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  return user;
}

async function create(data: CreateUserParams) {
  return await prisma.users.create({
    data,
  });
}

const authRepository = {
  findByEmail,
  create,
};

export default authRepository;
