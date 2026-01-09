/*
  Warnings:

  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."vehicles";

-- CreateTable
CREATE TABLE "vehicles_general" (
    "id" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brandId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "color_ext" TEXT NOT NULL,
    "color_int" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "StatusVehicle" NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_general_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_technical" (
    "vehicleId" TEXT NOT NULL,
    "engine_fuel_type" TEXT NOT NULL,
    "engine_configuration" TEXT NOT NULL,
    "engine_cylinders" INTEGER NOT NULL,
    "engine_power" INTEGER NOT NULL,
    "engine_displacement" DOUBLE PRECISION NOT NULL,
    "engine_turbo" TEXT NOT NULL,
    "drivetrain" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_technical_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "vehicle_images" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "vehicle_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_specifications" (
    "vehicleId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,

    CONSTRAINT "vehicle_specifications_pkey" PRIMARY KEY ("vehicleId","specificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_general_vin_key" ON "vehicles_general"("vin");

-- CreateIndex
CREATE INDEX "vehicle_images_vehicleId_idx" ON "vehicle_images"("vehicleId");

-- CreateIndex
CREATE INDEX "vehicle_specifications_vehicleId_idx" ON "vehicle_specifications"("vehicleId");

-- CreateIndex
CREATE INDEX "vehicle_specifications_specificationId_idx" ON "vehicle_specifications"("specificationId");

-- AddForeignKey
ALTER TABLE "vehicles_general" ADD CONSTRAINT "vehicles_general_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_technical" ADD CONSTRAINT "vehicles_technical_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_images" ADD CONSTRAINT "vehicle_images_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_specifications" ADD CONSTRAINT "vehicle_specifications_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_specifications" ADD CONSTRAINT "vehicle_specifications_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
