/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `mustChangePassword` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_sellerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "sellerId",
ADD COLUMN     "seller" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mustChangePassword";
