import { prisma } from "../config/database";

async function findRetweet(userId: number, postId: number) {
  const retweetExists = await prisma.retweets.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (retweetExists) {
    return retweetExists.id;
  } else {
    return null;
  }
}

async function retweet(userId: number, postId: number) {
  await prisma.retweets.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });
}

async function removeRetweet(retweetId: number) {
  await prisma.retweets.delete({
    where: {
      id: retweetId,
    },
  });
}

export default {
  findRetweet,
  retweet,
  removeRetweet,
};
