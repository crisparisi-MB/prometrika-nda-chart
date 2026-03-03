/*
  # Add footnote support to indications table

  1. Changes
    - Add `footnote` column to `indications` table to support indication-specific footnotes
    - Update the Multidose Dry Powder Inhaler indication with the required footnote text
  
  2. Notes
    - Uses `IF NOT EXISTS` to safely add the column if it doesn't already exist
    - Updates specific indication by ID to add the footnote text
*/

-- Add footnote column to indications table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'indications' AND column_name = 'footnote'
  ) THEN
    ALTER TABLE indications ADD COLUMN footnote text;
  END IF;
END $$;

-- Update the Multidose Dry Powder Inhaler indication with the footnote
UPDATE indications
SET footnote = '* Summary of Safety and Effectiveness Data [814.44]'
WHERE id = '1bc703ee-5677-4f8a-9a01-696d7d5c40ae';