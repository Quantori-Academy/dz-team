/*
  Warnings:

  - The primary key for the `Reagent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Reagent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_ReagentSamples` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ReagentSamples" DROP CONSTRAINT "_ReagentSamples_A_fkey";

-- AlterTable
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_pkey",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Reagent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "_ReagentSamples" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_ReagentSamples_AB_unique" ON "_ReagentSamples"("A", "B");

-- AddForeignKey
ALTER TABLE "_ReagentSamples" ADD CONSTRAINT "_ReagentSamples_A_fkey" FOREIGN KEY ("A") REFERENCES "Reagent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
