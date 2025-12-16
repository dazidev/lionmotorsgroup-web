-- CreateEnum
CREATE TYPE "TypeSpecification" AS ENUM ('security', 'confort');

-- CreateTable
CREATE TABLE "specifications" (
    "id" TEXT NOT NULL,
    "type" "TypeSpecification" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "specifications_type_idx" ON "specifications"("type");
