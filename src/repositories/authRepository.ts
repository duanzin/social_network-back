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

async function findByUserName(userName: string) {
  const user = await prisma.users.findUnique({
    where: {
      userName,
    },
  });

  return user;
}

async function create(data: CreateUserParams) {
  const { id } = await prisma.users.create({
    data,
  });

  await prisma.relationships.create({
    data: {
      followerId: id,
      followedId: id,
    },
  });
}

export default {
  findByEmail,
  findByUserName,
  create,
};
