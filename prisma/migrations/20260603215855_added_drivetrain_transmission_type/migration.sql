/*
  Warnings:

  - Changed the type of `engine_fuel_type` on the `vehicles_technical` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `drivetrain` on the `vehicles_technical` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `transmission` on the `vehicles_technical` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DrivetrainType" AS ENUM ('4x4', '4x2');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('automatic', 'manual');

-- AlterTable
ALTER TABLE "vehicles_technical" DROP COLUMN "engine_fuel_type",
ADD COLUMN     "engine_fuel_type" "FuelType" NOT NULL,
DROP COLUMN "drivetrain",
ADD COLUMN     "drivetrain" "DrivetrainType" NOT NULL,
DROP COLUMN "transmission",
ADD COLUMN     "transmission" "TransmissionType" NOT NULL;
