/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `vehicles_general` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `vehicles_general` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles_general" ADD COLUMN     "shortId" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_general_shortId_key" ON "vehicles_general"("shortId");
