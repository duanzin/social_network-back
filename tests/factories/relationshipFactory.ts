import { faker } from "@faker-js/faker";
import { relationships } from "@prisma/client";
import { prisma } from "../../src/config/database";

export async function createRelationship(
  followerId: number,
  followedId: number
): Promise<relationships> {
  return prisma.relationships.create({
    data: {
      followerId: followerId || faker.number.int(),
      followedId: followedId || faker.number.int(),
    },
  });
}
