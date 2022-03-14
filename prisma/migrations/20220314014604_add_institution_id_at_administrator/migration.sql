/*
  Warnings:

  - You are about to drop the column `administrator_id` on the `institution` table. All the data in the column will be lost.
  - Added the required column `institutionId` to the `administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrator" ADD COLUMN     "institutionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "institution" DROP COLUMN "administrator_id";

-- AddForeignKey
ALTER TABLE "administrator" ADD CONSTRAINT "administrator_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
