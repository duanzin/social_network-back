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
  for (let i = 0; i < 20; i++) {
    const user = await prisma.users.create({
      data: {
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        password: hashedPassword,
        pfp: faker.internet.avatar(),
      },
    });

    for (let j = 0; j < 10; j++) {
      await prisma.posts.create({
        data: {
          content: faker.lorem.sentence(),
          userId: user.id,
        },
      });
    }

    const userCount = await prisma.users.count();

    const users = await prisma.users.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
      take: 5,
      skip: Math.floor(Math.random() * Math.max(0, userCount - 5)),
    });

    for (const randomUser of users) {
      await prisma.relationships.create({
        data: {
          followerId: user.id,
          followedId: randomUser.id,
        },
      });
    }

    await prisma.relationships.create({
      data: {
        followerId: user.id,
        followedId: user.id,
      },
    });
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
