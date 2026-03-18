/*
  Warnings:

  - Added the required column `investment` to the `vehicles_general` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles_general" ADD COLUMN     "investment" INTEGER NOT NULL;
