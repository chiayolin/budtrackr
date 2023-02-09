/*
  Warnings:

  - You are about to drop the column `amount` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `budget` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expend` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expend" DOUBLE PRECISION NOT NULL;
