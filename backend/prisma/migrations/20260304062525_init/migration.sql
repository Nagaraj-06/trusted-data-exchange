-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'INSTITUTION', 'ADMIN');

-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('PENDING', 'VERIFIED', 'REVOKED');

-- CreateEnum
CREATE TYPE "InstitutionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "googleId" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institutionId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accreditation" TEXT,
    "contactEmail" TEXT,
    "address" TEXT,
    "status" "InstitutionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_records" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "degree" TEXT NOT NULL,
    "program" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "graduationYear" INTEGER,
    "grade" TEXT,
    "status" "RecordStatus" NOT NULL DEFAULT 'PENDING',
    "refCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_links" (
    "id" TEXT NOT NULL,
    "recordId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shared_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "userEmail" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "academic_records_refCode_key" ON "academic_records"("refCode");

-- CreateIndex
CREATE UNIQUE INDEX "shared_links_token_key" ON "shared_links"("token");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_records" ADD CONSTRAINT "academic_records_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_links" ADD CONSTRAINT "shared_links_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "academic_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
