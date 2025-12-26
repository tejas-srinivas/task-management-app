-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_clientId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
