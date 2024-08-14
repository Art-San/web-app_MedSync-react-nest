/*
  Warnings:

  - Added the required column `slug` to the `diagnostics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diagnostics" ADD COLUMN     "slug" TEXT NOT NULL;
