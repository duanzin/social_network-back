import { prisma } from "../../src/config/database";
import { relationships } from "@prisma/client";
import { createUser } from "./userFactory";

export async function createRelationship(
  followerId: number = null,
  followedId: number = null
): Promise<relationships> {
  if (followerId === null) {
    const { id } = await createUser();
    followerId = id;
  }
  if (followedId === null) {
    const { id } = await createUser();
    followedId = id;
  }
  return prisma.relationships.create({
    data: {
      followerId: followerId,
      followedId: followedId,
    },
  });
}
