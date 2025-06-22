
-- Create newsletter_subscriptions table if it doesn't exist or update existing one
DO $$ 
BEGIN
    -- Check if newsletter_table exists and has the right structure
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'newsletter_table') THEN
        -- Add any missing columns to existing table
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'newsletter_table' AND column_name = 'subscribed_at') THEN
            ALTER TABLE newsletter_table ADD COLUMN subscribed_at timestamp with time zone DEFAULT now();
        END IF;
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'newsletter_table' AND column_name = 'status') THEN
            ALTER TABLE newsletter_table ADD COLUMN status text DEFAULT 'active';
        END IF;
    ELSE
        -- Create new newsletter table
        CREATE TABLE newsletter_table (
            id bigserial PRIMARY KEY,
            email text NOT NULL UNIQUE,
            subscribed_at timestamp with time zone DEFAULT now(),
            status text DEFAULT 'active',
            created_at timestamp with time zone DEFAULT now()
        );
    END IF;

    -- Check if quotation_table exists and has the right structure
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quotation_table') THEN
        -- Update existing table structure if needed
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'quotation_table' AND column_name = 'status') THEN
            ALTER TABLE quotation_table ADD COLUMN status text DEFAULT 'pending';
        END IF;
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'quotation_table' AND column_name = 'requested_at') THEN
            ALTER TABLE quotation_table ADD COLUMN requested_at timestamp with time zone DEFAULT now();
        END IF;
    ELSE
        -- Create new quotation table with proper structure
        CREATE TABLE quotation_table (
            id bigserial PRIMARY KEY,
            name text,
            email text,
            phone_number text,
            location text,
            product text,
            quantity numeric,
            additional_info text,
            socials text,
            status text DEFAULT 'pending',
            requested_at timestamp with time zone DEFAULT now(),
            received_at timestamp with time zone DEFAULT now()
        );
    END IF;
END $$;

-- Enable RLS on both tables
ALTER TABLE newsletter_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_table ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter_table (allow public access for subscriptions)
DROP POLICY IF EXISTS "Allow public newsletter subscriptions" ON newsletter_table;
CREATE POLICY "Allow public newsletter subscriptions" ON newsletter_table
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public newsletter reading" ON newsletter_table;
CREATE POLICY "Allow public newsletter reading" ON newsletter_table
    FOR SELECT USING (true);

-- Create policies for quotation_table (allow public access for quotations)
DROP POLICY IF EXISTS "Allow public quotation requests" ON quotation_table;
CREATE POLICY "Allow public quotation requests" ON quotation_table
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public quotation reading" ON quotation_table;
CREATE POLICY "Allow public quotation reading" ON quotation_table
    FOR SELECT USING (true);
