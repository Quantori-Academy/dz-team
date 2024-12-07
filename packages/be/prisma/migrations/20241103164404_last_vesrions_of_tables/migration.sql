/*
  Warnings:

  - You are about to drop the column `initialQuantity` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Sample` table. All the data in the column will be lost.
  - The `unit` column on the `Sample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Sample` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "initialQuantity",
DROP COLUMN "title",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'sample',
ADD COLUMN     "container" "Container",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantityInit" DOUBLE PRECISION,
ADD COLUMN     "storageId" UUID NOT NULL,
ADD COLUMN     "storageLocation" TEXT,
DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT 'ml';

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
