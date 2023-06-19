import { relationships } from "@prisma/client";
import relationshipRepository from "../repositories/relationshipRepository";

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
  followOrUnfollow,
};
