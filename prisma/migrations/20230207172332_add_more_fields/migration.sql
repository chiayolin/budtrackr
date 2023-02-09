/*
  Warnings:

  - Added the required column `amount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
