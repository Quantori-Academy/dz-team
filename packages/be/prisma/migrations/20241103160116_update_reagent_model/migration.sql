/*
  Warnings:

  - Made the column `storageLocation` on table `Reagent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "storageLocation" SET NOT NULL;
