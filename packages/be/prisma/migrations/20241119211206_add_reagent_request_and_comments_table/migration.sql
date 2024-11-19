-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'ordered', 'declined', 'completed');

-- CreateTable
CREATE TABLE "ReagentRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "structure" TEXT NOT NULL,
    "cas" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'ml',
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "ReagentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReagentRequestComment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "comment" TEXT NOT NULL,
    "reagentRequestId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "ReagentRequestComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReagentRequest" ADD CONSTRAINT "ReagentRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReagentRequest" ADD CONSTRAINT "ReagentRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReagentRequestComment" ADD CONSTRAINT "ReagentRequestComment_reagentRequestId_fkey" FOREIGN KEY ("reagentRequestId") REFERENCES "ReagentRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReagentRequestComment" ADD CONSTRAINT "ReagentRequestComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
