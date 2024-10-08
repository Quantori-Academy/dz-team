-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "rdkit";

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('REAGENT', 'SAMPLE');

-- CreateTable
CREATE TABLE "Molecule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "smiles" TEXT NOT NULL,

    CONSTRAINT "Molecule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reagent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "structure" TEXT,
    "description" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "size" DOUBLE PRECISION,
    "expirationDate" TIMESTAMP(3),
    "storageLocation" TEXT NOT NULL DEFAULT 'Room 23, Cabinet 2, Shelf 5',
    "cas" TEXT,
    "producer" TEXT,
    "catalogId" TEXT,
    "catalogLink" TEXT,
    "pricePerUnit" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reagent_pkey" PRIMARY KEY ("id")
);
