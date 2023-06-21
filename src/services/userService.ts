import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";
import relationshipRepository from "../repositories/relationshipRepository";

async function getUser(profileId: number): Promise<UserParams> {
  const user = await userRepository.findById(profileId);
  if (!user) throw notFoundError();
  const followers: number = (
    await relationshipRepository.findFollowers(profileId)
  ).length;
  const following: number = (
    await relationshipRepository.findFollowing(profileId)
  ).length - 1;
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
