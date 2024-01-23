import { prisma } from "../config/database";

async function getAll() {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
          slug: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
    },
  });
}

async function getFromUser(id: number) {
  return await prisma.posts.findMany({
    where: {
      OR: [
        {
          userId: id,
        },
        {
          retweets: {
            some: {
              userId: id,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
      retweets: true,
    },
  });
}

async function getFromFollowed(following: number[]) {
  return await prisma.posts.findMany({
    where: {
      OR: [
        {
          userId: {
            in: following,
          },
        },
        {
          retweets: {
            some: {
              userId: {
                in: following,
              },
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
      retweets: true,
    },
  });
}

async function create(id: number, content: string) {
  await prisma.posts.create({
    data: {
      userId: id,
      content,
    },
  });
}

async function getPostById(postId: number) {
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
    include: {
      users: {
        select: {
          id: true,
          pfp: true,
          name: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
      retweets: true,
    },
  });

  return post;
}

export default {
  getAll,
  getFromUser,
  getFromFollowed,
  create,
  getPostById,
};
