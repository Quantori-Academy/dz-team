/*
  Warnings:

  - You are about to drop the `ReagentRequestComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReagentRequest" DROP CONSTRAINT "ReagentRequest_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ReagentRequestComment" DROP CONSTRAINT "ReagentRequestComment_reagentRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ReagentRequestComment" DROP CONSTRAINT "ReagentRequestComment_userId_fkey";

-- AlterTable
ALTER TABLE "Reagent" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReagentRequest" ADD COLUMN     "commentsProcurement" TEXT[],
ADD COLUMN     "commentsUser" TEXT[],
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "structure" DROP NOT NULL,
ALTER COLUMN "cas" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;

-- DropTable
DROP TABLE "ReagentRequestComment";

-- AddForeignKey
ALTER TABLE "ReagentRequest" ADD CONSTRAINT "ReagentRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
