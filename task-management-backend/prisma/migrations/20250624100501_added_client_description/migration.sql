/*
  Warnings:

  - You are about to drop the column `projectName` on the `client` table. All the data in the column will be lost.
  - Added the required column `description` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "projectName",
ADD COLUMN     "description" VARCHAR(255) NOT NULL;
