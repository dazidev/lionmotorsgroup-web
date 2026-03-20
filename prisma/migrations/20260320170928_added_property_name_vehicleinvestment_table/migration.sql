/*
  Warnings:

  - Added the required column `name` to the `vehicle_investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle_investment" ADD COLUMN     "name" TEXT NOT NULL;
