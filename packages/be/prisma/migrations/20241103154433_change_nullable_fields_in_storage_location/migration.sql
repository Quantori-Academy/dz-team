/*
  Warnings:

  - Made the column `createdAt` on table `StorageLocation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `StorageLocation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level1` on table `StorageLocation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level3` on table `StorageLocation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level4` on table `StorageLocation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StorageLocation" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "level1" SET NOT NULL,
ALTER COLUMN "level3" SET NOT NULL,
ALTER COLUMN "level4" SET NOT NULL;
