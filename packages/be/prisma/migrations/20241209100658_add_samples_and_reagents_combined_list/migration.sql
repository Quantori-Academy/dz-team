-- AlterTable
ALTER TABLE "Sample" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CombinedList" (
    "id" UUID NOT NULL,
    "category" TEXT,
    "name" TEXT,
    "structure" TEXT,
    "description" TEXT,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "quantityInit" DOUBLE PRECISION,
    "expirationDate" TIMESTAMP(3),
    "producer" TEXT,
    "catalogId" TEXT,
    "catalogLink" TEXT,
    "pricePerUnit" DOUBLE PRECISION,
    "currency" TEXT,
    "type" "ReagentType",
    "status" "ReagentStatus",
    "cas" TEXT,
    "storageLocation" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CombinedList_pkey" PRIMARY KEY ("id")
);
