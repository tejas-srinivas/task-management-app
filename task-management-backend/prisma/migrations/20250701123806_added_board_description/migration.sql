/*
  Warnings:

  - You are about to drop the column `projectName` on the `board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "board" DROP COLUMN "projectName",
ADD COLUMN     "description" VARCHAR(255);
