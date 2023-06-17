import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";
import { relationships } from "@prisma/client";

async function getUser(profileId: number): Promise<UserParams> {
  const user = await userRepository.findById(profileId);
  if (!user) throw notFoundError();
  const relationships = await userRepository.findAllRelationships(profileId);
  const { id, name, createdAt, updatedAt, pfp } = user;
  const userWithRelationships = {
    id,
    name,
    createdAt,
    updatedAt,
    pfp,
    relationships,
  };
  return userWithRelationships;
}

async function getAllUsers() {
  return await userRepository.findAllUsers();
}

async function followOrUnfollow(followerId: number, followedId: number) {
  const relationshipExists: relationships =
    await userRepository.findRelationship(followerId, followedId);
  if (relationshipExists) {
    await userRepository.unfollow(relationshipExists.id);
    return null;
  }
  const { id } = await userRepository.follow(followerId, followedId);
  return id;
}

export default {
  getUser,
  getAllUsers,
  followOrUnfollow,
};
