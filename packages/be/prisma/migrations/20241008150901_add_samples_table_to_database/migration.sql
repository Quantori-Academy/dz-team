-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "structure" TEXT,
    "initialQuantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReagentSamples" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReagentSamples_AB_unique" ON "_ReagentSamples"("A", "B");

-- CreateIndex
CREATE INDEX "_ReagentSamples_B_index" ON "_ReagentSamples"("B");

-- AddForeignKey
ALTER TABLE "_ReagentSamples" ADD CONSTRAINT "_ReagentSamples_A_fkey" FOREIGN KEY ("A") REFERENCES "Reagent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReagentSamples" ADD CONSTRAINT "_ReagentSamples_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
