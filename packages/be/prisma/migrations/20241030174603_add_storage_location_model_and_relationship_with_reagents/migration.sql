/*
  Warnings:

  - You are about to drop the column `storageLocation` on the `Reagent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "storageLocation",
ADD COLUMN     "storageLocationId" TEXT;

-- CreateTable
CREATE TABLE "StorageLocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "StorageLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageLocationId_fkey" FOREIGN KEY ("storageLocationId") REFERENCES "StorageLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
