-- CreateEnum
CREATE TYPE "Category" AS ENUM ('REAGENT', 'SAMPLE');

-- CreateTable
CREATE TABLE "Reagent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "structure" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantityLeft" DOUBLE PRECISION NOT NULL,
    "storageLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reagent_pkey" PRIMARY KEY ("id")
);
