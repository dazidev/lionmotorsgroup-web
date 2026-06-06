/*
  Warnings:

  - Added the required column `invoiceKey` to the `vehicle_investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle_investment" ADD COLUMN     "invoiceKey" TEXT NOT NULL;
