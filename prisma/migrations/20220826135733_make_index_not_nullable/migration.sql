/*
  Warnings:

  - Made the column `index` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "index" SET NOT NULL;
