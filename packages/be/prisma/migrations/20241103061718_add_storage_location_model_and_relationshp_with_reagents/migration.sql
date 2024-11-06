/*
  Warnings:

  - Added the required column `storageId` to the `Reagent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reagent" ADD COLUMN     "storageId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "StorageLocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StorageLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
