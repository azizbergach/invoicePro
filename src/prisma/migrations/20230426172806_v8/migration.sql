/*
  Warnings:

  - A unique constraint covering the columns `[CustomerNumber]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "CustomerNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customer_CustomerNumber_key" ON "customer"("CustomerNumber");
