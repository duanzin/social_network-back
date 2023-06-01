/*
  Warnings:

  - You are about to drop the `tweets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_userId_fkey";

-- DropTable
DROP TABLE "tweets";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
