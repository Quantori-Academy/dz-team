/*
  Warnings:

  - Made the column `storageId` on table `Reagent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_storageId_fkey";

-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "storageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StorageLocation" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
