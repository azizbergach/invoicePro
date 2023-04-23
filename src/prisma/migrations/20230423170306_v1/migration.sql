/*
  Warnings:

  - You are about to drop the column `gendre` on the `user` table. All the data in the column will be lost.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "gendre",
ADD COLUMN     "gender" "GENDER" NOT NULL;

-- DropEnum
DROP TYPE "GENDRE";
