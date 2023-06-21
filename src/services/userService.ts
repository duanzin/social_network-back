import { prisma } from "../config/database";
import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";

async function getUser(profileId: number): Promise<UserParams> {
  const user = await userRepository.findById(profileId);
  if (!user) throw notFoundError();
  const followers: number = await prisma.relationships.count({
    where: {
      followedId: profileId,
      NOT: {
        followerId: profileId,
      },
    },
  });
  const following: number = await prisma.relationships.count({
    where: {
      followerId: profileId,
      NOT: {
        followedId: profileId,
      },
    },
  });
  const { id, name, createdAt, updatedAt, pfp } = user;
  const userWithRelationships = {
    id,
    name,
    createdAt,
    updatedAt,
    pfp,
    profileOwner: false,
    followers,
    following,
  };
  return userWithRelationships;
}

async function getAllUsers(userId: number) {
  return await userRepository.findAllUsers(userId);
}

export default {
  getUser,
  getAllUsers,
};
