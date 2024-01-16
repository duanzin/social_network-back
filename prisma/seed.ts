import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const userCount = await prisma.users.count();
  if (userCount > 0) {
    console.log("Users table is not empty. Skipping seed.");
    return;
  }
  const hashedPassword = await bcrypt.hash("123456789", 11);

  const usersData = Array.from({ length: 20 }, () => {
    const userName = faker.internet.userName();
    const slug = userName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();

    return {
      name: faker.internet.displayName(),
      userName,
      email: faker.internet.email(),
      slug,
      password: hashedPassword,
      pfp: faker.internet.avatar(),
      banner: faker.image.urlLoremFlickr(),
    };
  });

  await prisma.users.createMany({ data: usersData });
  const createdUsers = await prisma.users.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
    },
  });

  await prisma.posts.createMany({
    data: createdUsers.flatMap((user, index) =>
      Array.from({ length: 10 }, () => ({
        content: faker.lorem.sentence(),
        userId: user.id,
      }))
    ),
  });

  function getRandomElements(array, numElements) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }

  for (let i = 0; i < createdUsers.length; i++) {
    const currentUser = createdUsers[i];
    const otherUsers = createdUsers.filter(
      (user) => user.id !== currentUser.id
    );

    const randomUsers = getRandomElements(otherUsers, 5);

    for (const randomUser of randomUsers) {
      await prisma.relationships.create({
        data: {
          followerId: currentUser.id,
          followedId: randomUser.id,
        },
      });
    }
    await prisma.relationships.create({
      data: {
        followerId: currentUser.id,
        followedId: currentUser.id,
      },
    });
    const allPosts = await prisma.posts.findMany();
    const randomPosts = getRandomElements(allPosts, 5);

    for (const post of randomPosts) {
      await prisma.likes.create({
        data: {
          userId: currentUser.id,
          postId: post.id,
        },
      });

      await prisma.retweets.create({
        data: {
          userId: currentUser.id,
          postId: post.id,
        },
      });
    }
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
