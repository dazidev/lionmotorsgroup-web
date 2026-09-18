-- CreateEnum
CREATE TYPE "TitleStatus" AS ENUM ('clean', 'salvage', 'rebuilt');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DrivetrainType" ADD VALUE 'FWD';
ALTER TYPE "DrivetrainType" ADD VALUE 'RWD';
ALTER TYPE "DrivetrainType" ADD VALUE 'AWD';

-- AlterTable
ALTER TABLE "vehicles_general" ADD COLUMN     "titleStatus" "TitleStatus";
