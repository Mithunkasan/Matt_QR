DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Submission'
      AND column_name = 'fullName'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Submission'
      AND column_name = 'name'
  ) THEN
    ALTER TABLE "Submission" RENAME COLUMN "fullName" TO "name";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Submission'
      AND column_name = 'phone'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Submission'
      AND column_name = 'mobileNumber'
  ) THEN
    ALTER TABLE "Submission" RENAME COLUMN "phone" TO "mobileNumber";
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Submission'
      AND column_name = 'address'
  ) THEN
    ALTER TABLE "Submission" ALTER COLUMN "address" DROP NOT NULL;
  END IF;
END $$;

ALTER TABLE "Submission"
  ADD COLUMN IF NOT EXISTS "age" INTEGER NOT NULL DEFAULT 18,
  ADD COLUMN IF NOT EXISTS "collegeName" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "department" TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS "year" TEXT NOT NULL DEFAULT '1st Year',
  ADD COLUMN IF NOT EXISTS "alternativeMobileNumber" TEXT;

ALTER TABLE "Submission"
  ALTER COLUMN "age" DROP DEFAULT,
  ALTER COLUMN "collegeName" DROP DEFAULT,
  ALTER COLUMN "department" DROP DEFAULT,
  ALTER COLUMN "year" DROP DEFAULT;

CREATE INDEX IF NOT EXISTS "Submission_createdAt_idx" ON "Submission"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Submission_email_idx" ON "Submission"("email");
CREATE INDEX IF NOT EXISTS "Submission_formId_idx" ON "Submission"("formId");
CREATE INDEX IF NOT EXISTS "Submission_mobileNumber_idx" ON "Submission"("mobileNumber");
CREATE INDEX IF NOT EXISTS "Submission_collegeName_idx" ON "Submission"("collegeName");
