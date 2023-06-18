import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";
import { relationships } from "@prisma/client";
import relationshipRepository from "../repositories/relationshipRepository";

async function getUser(profileId: number): Promise<UserParams> {
  const user = await userRepository.findById(profileId);
  if (!user) throw notFoundError();
  const followers = (await relationshipRepository.findFollowers(profileId))
    .length;
  const following = (await relationshipRepository.findFollowing(profileId))
    .length;
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

async function followOrUnfollow(followerId: number, followedId: number) {
  const relationshipExists: relationships =
    await relationshipRepository.findRelationship(followerId, followedId);
  if (relationshipExists) {
    await relationshipRepository.unfollow(relationshipExists.id);
    return null;
  }
  const { id } = await relationshipRepository.follow(followerId, followedId);
  return id;
}

export default {
  getUser,
  getAllUsers,
  followOrUnfollow,
};
