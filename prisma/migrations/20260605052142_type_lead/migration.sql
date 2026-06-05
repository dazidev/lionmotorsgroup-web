/*
  Warnings:

  - Added the required column `type` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeLead" AS ENUM ('vehicle', 'general');

-- DropForeignKey
ALTER TABLE "public"."leads" DROP CONSTRAINT "leads_vehicleId_fkey";

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "type" "TypeLead" NOT NULL,
ALTER COLUMN "vehicleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE SET NULL ON UPDATE CASCADE;
