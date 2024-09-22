-- CreateTable
CREATE TABLE "Molecule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "smiles" TEXT NOT NULL,

    CONSTRAINT "Molecule_pkey" PRIMARY KEY ("id")
);
