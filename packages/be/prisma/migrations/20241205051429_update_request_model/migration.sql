/*
  Warnings:

  - The `unit` column on the `ReagentRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ReagentRequestComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReagentRequestComment" DROP CONSTRAINT "ReagentRequestComment_reagentRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ReagentRequestComment" DROP CONSTRAINT "ReagentRequestComment_userId_fkey";

-- AlterTable
ALTER TABLE "ReagentRequest" ADD COLUMN     "commentsProcurement" TEXT[],
ADD COLUMN     "commentsUser" TEXT[],
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'ml';

-- DropTable
DROP TABLE "ReagentRequestComment";
