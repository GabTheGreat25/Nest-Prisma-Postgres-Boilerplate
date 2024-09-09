-- CreateTable
CREATE TABLE "TestChild" (
    "id" SERIAL NOT NULL,
    "testChild" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testId" INTEGER NOT NULL,

    CONSTRAINT "TestChild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestChild" ADD CONSTRAINT "TestChild_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
