/*
  Warnings:

  - You are about to drop the `card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "card";

-- CreateTable
CREATE TABLE "ticket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT[],

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);
