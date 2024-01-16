import userRepository from "../repositories/userRepository";
import postsRepository from "../repositories/postsRepository";
import { notFoundError } from "../errors/index";
import { posts } from "@prisma/client";
import relationshipRepository from "../repositories/relationshipRepository";
import likesRepository from "../repositories/likesRepository";
import retweetRepository from "repositories/retweetRepository";

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

async function likeOrUnlike(userId: number, postId: number) {
  const postExists = await postsRepository.getPostById(postId);
  if(!postExists) throw notFoundError();
  const likeId: number | null = await likesRepository.findLike(userId, postId);
  if (likeId === null) {
    await likesRepository.like(userId, postId);
  } else {
    await likesRepository.unlike(likeId);
  }
}

async function retweet(userId: number, postId: number) {
  const postExists = await postsRepository.getPostById(postId);
  if(!postExists) throw notFoundError();
  const retweetId: number | null = await retweetRepository.findRetweet(
    userId,
    postId
  );
  if (retweetId === null) {
    await retweetRepository.retweet(userId, postId);
  } else {
    await retweetRepository.removeRetweet(retweetId);
  }
}

export default {
  getPostsFromAll,
  getPostsFromUser,
  getFromFollowed,
  createPost,
  likeOrUnlike,
  retweet,
};
