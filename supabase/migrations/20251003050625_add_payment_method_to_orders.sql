/*
  # Add Payment Method to Orders

  1. Changes
    - Add payment_method column to orders table
    - Support 'card' and 'cash_on_delivery' payment methods
    - Set default to 'card' for backward compatibility

  2. Security
    - No RLS changes needed
    - Maintains existing security policies
*/

-- Add payment_method column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE orders ADD COLUMN payment_method text DEFAULT 'card' CHECK (payment_method IN ('card', 'cash_on_delivery'));
  END IF;
END $$;
