-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "amount" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
