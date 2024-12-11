-- DropForeignKey
ALTER TABLE "ReagentRequest" DROP CONSTRAINT "ReagentRequest_orderId_fkey";

-- AlterTable
ALTER TABLE "ReagentRequest" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "structure" DROP NOT NULL,
ALTER COLUMN "cas" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReagentRequest" ADD CONSTRAINT "ReagentRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
