-- DropForeignKey
ALTER TABLE "TestChild" DROP CONSTRAINT "TestChild_testId_fkey";

-- AddForeignKey
ALTER TABLE "TestChild" ADD CONSTRAINT "TestChild_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
