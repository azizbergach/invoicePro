/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customerId_fkey";

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "address";
