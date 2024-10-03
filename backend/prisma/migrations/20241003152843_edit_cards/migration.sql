/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "amount" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);
