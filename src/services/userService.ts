import userRepository from "../repositories/userRepository";
import { notFoundError } from "../errors/index";
import { UserParams } from "../protocols/userProtocols";
import { relationships } from "@prisma/client";

async function getUser(id: number): Promise<UserParams> {
  const user: UserParams = await userRepository.findById(id);
  if (!user) throw notFoundError();
  return user;
}

async function getAllUsers(): Promise<UserParams[]> {
  return await userRepository.findAll();
}

async function followOrUnfollow(followerId: number, followedId: number) {
  const relationshipExists: relationships =
    await userRepository.findRelationship(followerId, followedId);
  if (relationshipExists) {
    await userRepository.unfollow(relationshipExists.id);
  } else {
    await userRepository.follow(followerId, followedId);
  }
}

export default {
  getUser,
  getAllUsers,
  followOrUnfollow,
};
