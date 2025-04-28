-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('customer', 'superadmin');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Role" "userRole";
