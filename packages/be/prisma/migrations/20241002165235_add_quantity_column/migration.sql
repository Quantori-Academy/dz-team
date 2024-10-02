/*
  Warnings:

  - You are about to drop the column `casNumber` on the `Reagent` table. All the data in the column will be lost.
  - You are about to drop the column `quantityLeft` on the `Reagent` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Reagent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "casNumber",
DROP COLUMN "quantityLeft",
ADD COLUMN     "cas" TEXT,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "structure" DROP NOT NULL;
