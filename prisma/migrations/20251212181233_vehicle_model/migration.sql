-- CreateEnum
CREATE TYPE "StatusVehicle" AS ENUM ('in_stock', 'on_sale', 'sold');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "milage" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "StatusVehicle" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicles_vin_idx" ON "vehicles"("vin");
