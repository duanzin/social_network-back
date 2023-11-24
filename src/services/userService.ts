import { prisma } from "../config/database";
import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";

async function getUser(userSlug: string): Promise<UserParams> {
  const user = await userRepository.findBySlug(userSlug);
  if (!user) throw notFoundError();

  const { id, name, userName, pfp, banner, slug, createdAt } = user;

  const followers: number = await prisma.relationships.count({
    where: {
      followedId: id,
      NOT: {
        followerId: id,
      },
    },
  });
  const following: number = await prisma.relationships.count({
    where: {
      followerId: id,
      NOT: {
        followedId: id,
      },
    },
  });

  const userWithRelationships = {
    id,
    name,
    userName,
    pfp,
    banner,
    slug,
    profileOwner: false,
    followers,
    following,
    createdAt,
  };
  return userWithRelationships;
}

async function getAllUsers(userSlug: string) {
  return await userRepository.findAllUsers(userSlug);
}

export default {
  getUser,
  getAllUsers,
};
