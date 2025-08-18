/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "fundraising_app"."OrganizationType" AS ENUM ('UNIVERSITY', 'HIGH_SCHOOL');

-- DropTable
DROP TABLE "fundraising_app"."User";

-- CreateTable
CREATE TABLE "fundraising_app"."Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "type" "fundraising_app"."OrganizationType" NOT NULL DEFAULT 'UNIVERSITY',
    "taxNumber" TEXT NOT NULL,
    "maxMembers" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."Program" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "recommendedAmounts" JSONB,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."Member" (
    "id" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."Donation" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "programId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."Subscription" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "programId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising_app"."SubscriptionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubscriptionType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_legalName_key" ON "fundraising_app"."Organization"("legalName");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_taxNumber_key" ON "fundraising_app"."Organization"("taxNumber");

-- AddForeignKey
ALTER TABLE "fundraising_app"."Program" ADD CONSTRAINT "Program_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "fundraising_app"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Member" ADD CONSTRAINT "Member_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "fundraising_app"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "fundraising_app"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Donation" ADD CONSTRAINT "Donation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "fundraising_app"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Donation" ADD CONSTRAINT "Donation_programId_fkey" FOREIGN KEY ("programId") REFERENCES "fundraising_app"."Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Subscription" ADD CONSTRAINT "Subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "fundraising_app"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Subscription" ADD CONSTRAINT "Subscription_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "fundraising_app"."SubscriptionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Subscription" ADD CONSTRAINT "Subscription_programId_fkey" FOREIGN KEY ("programId") REFERENCES "fundraising_app"."Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
