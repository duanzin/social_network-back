import userRepository from "../repositories/userRepository";
import postsRepository from "../repositories/postsRepository";
import { notFoundError } from "../errors/index";
import { posts } from "@prisma/client";
import relationshipRepository from "../repositories/relationshipRepository";

async function getPostsFromAll(): Promise<posts[]> {
  return await postsRepository.getAll();
}

async function getPostsFromUser(id: number): Promise<posts[]> {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError();
  return await postsRepository.getFromUser(id);
}

async function getFromFollowed(id: number): Promise<posts[]> {
  const following = await relationshipRepository.findFollowing(id);
  const followedIds = following.map((relationship) => relationship.followedId);
  return await postsRepository.getFromFollowed(followedIds);
}

async function createPost(id: number, content: string) {
  await postsRepository.create(id, content);
}

export default {
  getPostsFromAll,
  getPostsFromUser,
  getFromFollowed,
  createPost,
};
