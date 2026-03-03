/*
  # Add Regulatory Agency Meeting Attendance Column

  1. Changes
    - Add `has_regulatory_meeting_attendance` column to `indications` table
    - Column type: text (to support check marks, dashes, or special markers)
    - Default value: '-'

  2. Notes
    - This column tracks whether regulatory agency meeting attendance documentation exists for each indication
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'indications' AND column_name = 'has_regulatory_meeting_attendance'
  ) THEN
    ALTER TABLE indications ADD COLUMN has_regulatory_meeting_attendance text DEFAULT '-';
  END IF;
END $$;
