-- Align resume_profiles with Prisma schema and add restore-point snapshots.

DELETE FROM "resume_profiles" WHERE "userId" IS NULL;

ALTER TABLE "resume_profiles"
  ALTER COLUMN "userId" SET NOT NULL;

CREATE UNIQUE INDEX "resume_profiles_userId_key" ON "resume_profiles"("userId");

ALTER TABLE "resume_profiles"
  ADD CONSTRAINT "resume_profiles_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "resume_versions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_versions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "resume_versions_userId_createdAt_idx" ON "resume_versions"("userId", "createdAt");

ALTER TABLE "resume_versions"
  ADD CONSTRAINT "resume_versions_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
