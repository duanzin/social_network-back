import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  let users = await prisma.users.findMany();
  if (users.length === 0) {
    await prisma.users.createMany({
      data: [
        {
          name: "michael jackson",
          email: "adiwoki@gmail.com",
          password:
            "$2a$10$LM8L3yKVtQ/SMcae33ASt.p0z4JQHuRDUNVwcH98Zyh8pdYMc0IEC",
          pfp: "https://www.correiodopovo.com.br/image/policy:1.928624:1669407367/disco.jpg?f=2x1&$p$f=88d22e4&w=1200&$w=9c05b01",
        },
      ],
    });
  }

  let tweets = await prisma.tweets.findMany();
  if (tweets.length === 0) {
    await prisma.tweets.createMany({
      data: [
        {
          content: "Billie Jean is not my lover",
          userId: 999,
        },
      ],
    });
  }

  let relationships = await prisma.relationships.findMany();
  if (relationships.length === 0) {
    await prisma.relationships.createMany({
      data: [
        {
          followerId: 999,
          followedId: 20,
        },
      ],
    });
  }

  console.log(users, tweets, relationships);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
