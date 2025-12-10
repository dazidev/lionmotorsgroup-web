-- CreateEnum
CREATE TYPE "StatusLead" AS ENUM ('unattended', 'attended');

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "zipcode" TEXT,
    "comments" TEXT,
    "status" "StatusLead" NOT NULL DEFAULT 'unattended',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
