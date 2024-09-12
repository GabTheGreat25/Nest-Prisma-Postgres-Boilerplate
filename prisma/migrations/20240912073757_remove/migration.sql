/*
  Warnings:

  - You are about to drop the column `government_id` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "government_id" JSONB;

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "government_id";
