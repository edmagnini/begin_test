-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "administrator" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'UNVERIFIED';
