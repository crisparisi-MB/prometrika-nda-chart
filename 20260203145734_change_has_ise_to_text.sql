/*
  # Change has_ise column to text type

  1. Changes
    - Alter `has_ise` column from boolean to text
    - Convert existing boolean values to appropriate text representations
    - This allows for special markers like asterisks in addition to check marks and dashes

  2. Notes
    - Existing true values will be converted to '✓'
    - Existing false values will be converted to '-'
    - This enables support for special cases like '*' for footnoted entries
*/

-- Add temporary column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'indications' AND column_name = 'has_ise_text'
  ) THEN
    ALTER TABLE indications ADD COLUMN has_ise_text text;
  END IF;
END $$;

-- Copy data with conversion
UPDATE indications
SET has_ise_text = CASE
  WHEN has_ise = true THEN '✓'
  WHEN has_ise = false THEN '-'
  ELSE '-'
END
WHERE has_ise_text IS NULL;

-- Drop old column
ALTER TABLE indications DROP COLUMN IF EXISTS has_ise;

-- Rename new column
ALTER TABLE indications RENAME COLUMN has_ise_text TO has_ise;

-- Set default
ALTER TABLE indications ALTER COLUMN has_ise SET DEFAULT '-';