/*
  Warnings:

  - You are about to drop the column `container` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `Reagent` table. All the data in the column will be lost.
  - The `currency` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unit` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `container` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `Sample` table. All the data in the column will be lost.
  - The `unit` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `storageId` on table `Reagent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `structure` on table `Sample` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_storageId_fkey";

-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "container",
DROP COLUMN "storageLocation",
ALTER COLUMN "storageId" SET NOT NULL,
DROP COLUMN "currency",
ADD COLUMN     "currency" TEXT,
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "container",
DROP COLUMN "storageLocation",
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ALTER COLUMN "structure" SET NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'researcher';

-- DropEnum
DROP TYPE "Container";

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "Unit";

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
