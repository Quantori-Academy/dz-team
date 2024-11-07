/*
  Warnings:

  - You are about to drop the column `level1` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `level2` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `level3` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `level4` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `value1` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `value2` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `value3` on the `StorageLocation` table. All the data in the column will be lost.
  - You are about to drop the column `value4` on the `StorageLocation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StorageLocation" DROP COLUMN "level1",
DROP COLUMN "level2",
DROP COLUMN "level3",
DROP COLUMN "level4",
DROP COLUMN "value1",
DROP COLUMN "value2",
DROP COLUMN "value3",
DROP COLUMN "value4";

-- DropEnum
DROP TYPE "Storage";
