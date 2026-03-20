-- CreateTable
CREATE TABLE "vehicle_investment" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_investment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicle_investment_vehicleId_idx" ON "vehicle_investment"("vehicleId");

-- AddForeignKey
ALTER TABLE "vehicle_investment" ADD CONSTRAINT "vehicle_investment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE CASCADE ON UPDATE CASCADE;
