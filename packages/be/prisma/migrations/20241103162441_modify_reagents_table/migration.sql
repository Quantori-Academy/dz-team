/*
  Warnings:

  - You are about to drop the column `Container` on the `Reagent` table. All the data in the column will be lost.
  - Made the column `storageId` on table `Reagent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_storageId_fkey";

-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "Container",
ADD COLUMN     "container" "Container",
ALTER COLUMN "storageLocation" DROP NOT NULL,
ALTER COLUMN "storageLocation" DROP DEFAULT,
ALTER COLUMN "storageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
