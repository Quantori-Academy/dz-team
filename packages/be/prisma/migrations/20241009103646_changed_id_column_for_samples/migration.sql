/*
  Warnings:

  - The primary key for the `Sample` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ReagentSamples" DROP CONSTRAINT "_ReagentSamples_B_fkey";

-- AlterTable
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sample_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sample_id_seq";

-- AlterTable
ALTER TABLE "_ReagentSamples" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_ReagentSamples" ADD CONSTRAINT "_ReagentSamples_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
