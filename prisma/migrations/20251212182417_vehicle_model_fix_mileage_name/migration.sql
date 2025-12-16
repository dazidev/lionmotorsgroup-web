/*
  Warnings:

  - You are about to drop the column `milage` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `mileage` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "milage",
ADD COLUMN     "mileage" INTEGER NOT NULL;
