-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicle_images" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicle_specifications" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vehicles_technical" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "vehicle_investment_deletedAt_idx" ON "vehicle_investment"("deletedAt");

-- CreateIndex
CREATE INDEX "vehicles_general_deletedAt_idx" ON "vehicles_general"("deletedAt");
