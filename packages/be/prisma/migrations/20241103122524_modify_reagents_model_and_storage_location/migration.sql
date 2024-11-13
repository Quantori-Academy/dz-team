/*
  Warnings:

  - You are about to drop the column `size` on the `Reagent` table. All the data in the column will be lost.
  - The `unit` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Reagent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('reagent', 'sample');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('usd', 'euro', 'rub', 'cny', 'jpy');

-- CreateEnum
CREATE TYPE "Container" AS ENUM ('bottle', 'box', 'other');

-- CreateEnum
CREATE TYPE "ReagentType" AS ENUM ('organic', 'inorganic', 'acidic', 'basic', 'oxidizing', 'reducing', 'precipitating', 'complexing', 'indicator', 'other');

-- CreateEnum
CREATE TYPE "ReagentStatus" AS ENUM ('available', 'lowStock', 'outOfStock', 'ordered', 'notAvailable');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('ml', 'l', 'mg', 'g', 'oz', 'lb');

-- CreateEnum
CREATE TYPE "Storage" AS ENUM ('block', 'building', 'warehouse', 'room', 'cabinet', 'shelf', 'box', 'refrigerator', 'freezer', 'container', 'bag', 'desiccator', 'glovebox');

-- AlterTable
ALTER TABLE "Reagent" DROP COLUMN "size",
ADD COLUMN     "Container" "Container",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'usd',
ADD COLUMN     "quantityInit" DOUBLE PRECISION,
ADD COLUMN     "type" "ReagentType",
DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT 'ml',
ALTER COLUMN "storageLocation" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'reagent',
DROP COLUMN "status",
ADD COLUMN     "status" "ReagentStatus";

-- AlterTable
ALTER TABLE "StorageLocation" ADD COLUMN     "level1" "Storage" DEFAULT 'building',
ADD COLUMN     "level2" "Storage" DEFAULT 'room',
ADD COLUMN     "level3" "Storage" DEFAULT 'cabinet',
ADD COLUMN     "level4" "Storage" DEFAULT 'shelf',
ADD COLUMN     "value1" TEXT,
ADD COLUMN     "value2" TEXT,
ADD COLUMN     "value3" TEXT,
ADD COLUMN     "value4" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
