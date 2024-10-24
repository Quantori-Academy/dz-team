/*
  Warnings:

  - The primary key for the `Sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_ReagentSamples` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ReagentSamples" DROP CONSTRAINT "_ReagentSamples_B_fkey";

-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Sample_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ReagentSamples" DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_ReagentSamples_AB_unique" ON "_ReagentSamples"("A", "B");

-- CreateIndex
CREATE INDEX "_ReagentSamples_B_index" ON "_ReagentSamples"("B");

-- AddForeignKey
ALTER TABLE "_ReagentSamples" ADD CONSTRAINT "_ReagentSamples_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
