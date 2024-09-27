/*
  Warnings:

  - Added the required column `unit` to the `Reagent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reagent" ADD COLUMN     "casNumber" TEXT,
ADD COLUMN     "catalogId" TEXT,
ADD COLUMN     "catalogLink" TEXT,
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ADD COLUMN     "pricePerUnit" DOUBLE PRECISION,
ADD COLUMN     "producer" TEXT,
ADD COLUMN     "size" DOUBLE PRECISION,
ADD COLUMN     "unit" TEXT NOT NULL;
