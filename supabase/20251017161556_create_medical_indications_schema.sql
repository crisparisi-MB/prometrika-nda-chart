/*
  # Medical Indications Chart Schema

  ## Overview
  Creates tables to store medical indication categories and their associated conditions with ISS, ISE, and Clinical Summaries availability markers.

  ## New Tables
  
  ### `indication_categories`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (e.g., "RARE DISEASES AND ONCOLOGY")
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `indications`
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Reference to category
  - `name` (text) - Indication name
  - `has_iss` (boolean) - ISS availability
  - `has_ise` (boolean) - ISE availability
  - `has_clinical_summaries` (boolean or text) - Clinical summaries availability (supports special markers like *)
  - `display_order` (integer) - Order within category
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on both tables
  - Add policies for public read access (medical reference data)
*/

-- Create indication_categories table
CREATE TABLE IF NOT EXISTS indication_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indications table
CREATE TABLE IF NOT EXISTS indications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES indication_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  has_iss boolean DEFAULT false,
  has_ise boolean DEFAULT false,
  has_clinical_summaries text DEFAULT '-',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE indication_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE indications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (this is reference/educational data)
CREATE POLICY "Allow public read access to categories"
  ON indication_categories
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated read access to categories"
  ON indication_categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to indications"
  ON indications
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated read access to indications"
  ON indications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_indications_category_id ON indications(category_id);
CREATE INDEX IF NOT EXISTS idx_indications_display_order ON indications(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON indication_categories(display_order);
