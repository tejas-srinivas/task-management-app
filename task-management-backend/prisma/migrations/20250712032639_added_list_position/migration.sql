/*
  Warnings:

  - Added the required column `position` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "list" ADD COLUMN     "position" INTEGER NOT NULL;
