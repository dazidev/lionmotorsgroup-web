/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `vehicle_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vehicle_images_key_key" ON "vehicle_images"("key");

ALTER TABLE "vehicles_general"
ADD CONSTRAINT "vehicles_general_price_non_negative_check"
CHECK ("price" >= 0);

ALTER TABLE "vehicles_general"
ADD CONSTRAINT "vehicles_general_mileage_non_negative_check"
CHECK ("mileage" >= 0);

ALTER TABLE "vehicles_general"
ADD CONSTRAINT "vehicles_general_investment_non_negative_check"
CHECK ("investment" >= 0);

ALTER TABLE "vehicles_general"
ADD CONSTRAINT "vehicles_general_doors_non_negative_check"
CHECK ("doors" >= 0);

ALTER TABLE "vehicles_technical"
ADD CONSTRAINT "vehicles_technical_engine_cylinders_non_negative_check"
CHECK ("engine_cylinders" >= 0);

ALTER TABLE "vehicles_technical"
ADD CONSTRAINT "vehicles_technical_engine_power_non_negative_check"
CHECK ("engine_power" >= 0);

ALTER TABLE "vehicles_technical"
ADD CONSTRAINT "vehicles_technical_engine_displacement_non_negative_check"
CHECK ("engine_displacement" >= 0);

ALTER TABLE "vehicle_investment"
ADD CONSTRAINT "vehicle_investment_amount_positive_check"
CHECK ("amount" > 0);

ALTER TABLE "vehicle_images"
ADD CONSTRAINT "vehicle_images_position_non_negative_check"
CHECK ("position" >= 0);

CREATE UNIQUE INDEX "vehicle_images_active_position_key"
ON "vehicle_images" ("vehicleId", "position")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "brands_name_case_insensitive_key"
ON "brands" (LOWER(BTRIM("name")));

CREATE UNIQUE INDEX "specifications_type_name_case_insensitive_key"
ON "specifications" ("type", LOWER(BTRIM("name")));
