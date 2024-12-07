/*
  Warnings:

  - The `unit` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unit` column on the `ReagentRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unit` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';

-- AlterTable
ALTER TABLE "ReagentRequest" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';
