/*
  Warnings:

  - You are about to drop the column `container` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `container` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `Sample` table. All the data in the column will be lost.
  - Made the column `storageId` on table `Reagent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `structure` on table `Sample` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'submitted', 'fulfilled', 'canceled');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'ordered', 'fulfilled', 'declined');

-- DropForeignKey
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_storageId_fkey";

-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "container",
DROP COLUMN "storageLocation",
ALTER COLUMN "storageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "container",
DROP COLUMN "storageLocation",
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ALTER COLUMN "structure" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'researcher';

-- DropEnum
DROP TYPE "Container";

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT,
    "creationDate" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "seller" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contents" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "authorId" UUID NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'ml',
    "cas" TEXT,
    "commentsUser" TEXT,
    "commentsProcurement" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReagentRequests" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ReagentOrders" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReagentRequests_AB_unique" ON "_ReagentRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_ReagentRequests_B_index" ON "_ReagentRequests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReagentOrders_AB_unique" ON "_ReagentOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_ReagentOrders_B_index" ON "_ReagentOrders"("B");

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReagentRequests" ADD CONSTRAINT "_ReagentRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "Reagent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReagentRequests" ADD CONSTRAINT "_ReagentRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReagentOrders" ADD CONSTRAINT "_ReagentOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReagentOrders" ADD CONSTRAINT "_ReagentOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Reagent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
