-- DropForeignKey
ALTER TABLE "Reagent" DROP CONSTRAINT "Reagent_storageId_fkey";

-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "storageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reagent" ADD CONSTRAINT "Reagent_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
