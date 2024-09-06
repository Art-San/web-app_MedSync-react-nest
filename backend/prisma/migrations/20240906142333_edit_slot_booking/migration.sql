/*
  Warnings:

  - You are about to drop the column `bookingTime` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `userFullName` on the `bookings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,locationId,bookingDateTime]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[diagnosticId,locationId,bookingDateTime]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingDateTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSurname` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "bookings_diagnosticId_locationId_bookingTime_key";

-- DropIndex
DROP INDEX "bookings_doctorId_locationId_bookingTime_key";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingTime",
DROP COLUMN "userFullName",
ADD COLUMN     "bookingDateTime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "telegramId" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "userSurname" TEXT NOT NULL,
ALTER COLUMN "userEmail" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "slots" ALTER COLUMN "dayNumber" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookings_doctorId_locationId_bookingDateTime_key" ON "bookings"("doctorId", "locationId", "bookingDateTime");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_diagnosticId_locationId_bookingDateTime_key" ON "bookings"("diagnosticId", "locationId", "bookingDateTime");
