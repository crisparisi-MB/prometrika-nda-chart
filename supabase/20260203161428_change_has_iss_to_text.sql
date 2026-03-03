/*
  # Change has_iss column from boolean to text

  1. Changes
    - Converts `has_iss` column in `indications` table from boolean to text type
    - This allows storing values like "-", "✓", or other text indicators
    - Existing true values will be converted to 't' and false to 'f', which will need manual correction
*/

-- Change has_iss from boolean to text
ALTER TABLE indications 
ALTER COLUMN has_iss TYPE text 
USING CASE 
  WHEN has_iss = true THEN '✓'
  WHEN has_iss = false THEN '-'
  ELSE '-'
END;
