-- AlterTable
ALTER TABLE "fundraising_app"."Member" ADD COLUMN     "donationsTotalAmount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "fundraising_app"."Program" ADD COLUMN     "categoryId" INTEGER;

-- CreateTable
CREATE TABLE "fundraising_app"."ProgramCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProgramCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fundraising_app"."Program" ADD CONSTRAINT "Program_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "fundraising_app"."ProgramCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
