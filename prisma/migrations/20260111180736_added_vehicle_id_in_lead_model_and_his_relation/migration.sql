/*
  Warnings:

  - A unique constraint covering the columns `[slug,shortId]` on the table `vehicles_general` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."vehicles_general" DROP CONSTRAINT "vehicles_general_brandId_fkey";

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_general_slug_shortId_key" ON "vehicles_general"("slug", "shortId");

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_general"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_general" ADD CONSTRAINT "vehicles_general_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
