/*
  Warnings:

  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `amount` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "fundraising_app"."SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "fundraising_app"."Member" DROP CONSTRAINT "Member_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "fundraising_app"."Program" DROP CONSTRAINT "Program_organizationId_fkey";

-- AlterTable
ALTER TABLE "fundraising_app"."Member" ALTER COLUMN "organizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "fundraising_app"."Organization" DROP CONSTRAINT "Organization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "fundraising_app"."Program" ALTER COLUMN "organizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "fundraising_app"."Subscription" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "status" "fundraising_app"."SubscriptionStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Program" ADD CONSTRAINT "Program_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "fundraising_app"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising_app"."Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "fundraising_app"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
