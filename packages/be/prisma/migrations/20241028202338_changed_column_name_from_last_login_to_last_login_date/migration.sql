/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
ADD COLUMN     "lastLoginDate" TIMESTAMP(3);
