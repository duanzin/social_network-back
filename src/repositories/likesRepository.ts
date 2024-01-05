import { prisma } from "../config/database";

async function findLike(userId: number, postId: number) {
  const likeExists = await prisma.likes.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (likeExists) {
    return likeExists.id;
  } else {
    return null;
  }
}

async function like(userId: number, postId: number) {
  await prisma.likes.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });
}

async function unlike(likeId: number) {
  await prisma.likes.delete({
    where: {
      id: likeId,
    },
  });
}

export default {
  findLike,
  like,
  unlike,
};
