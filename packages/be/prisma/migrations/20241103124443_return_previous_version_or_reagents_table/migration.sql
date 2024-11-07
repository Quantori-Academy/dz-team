/*
  Warnings:

  - You are about to drop the column `Container` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `quantityInit` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reagent` table. All the data in the column will be lost.
  - The `category` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `storageLocation` on table `Reagent` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `unit` on the `Reagent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "Container",
DROP COLUMN "currency",
DROP COLUMN "quantityInit",
DROP COLUMN "type",
ADD COLUMN     "size" DOUBLE PRECISION,
ALTER COLUMN "storageLocation" SET NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "Container";

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "ReagentStatus";

-- DropEnum
DROP TYPE "ReagentType";

-- DropEnum
DROP TYPE "Unit";
