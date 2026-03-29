import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Initialize the database schema
export async function initializeDatabase(): Promise<void> {
  const client = await pool.connect();
  try {
    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(10) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        phone_number VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        photo_consent BOOLEAN DEFAULT FALSE,
        is_waiting_list BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_registrations_session_id ON registrations(session_id);
      CREATE INDEX IF NOT EXISTS idx_registrations_is_waiting_list ON registrations(is_waiting_list);
    `);

    // Run migrations - add photo_consent column if it doesn't exist
    await client.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'registrations' AND column_name = 'photo_consent'
        ) THEN 
          ALTER TABLE registrations ADD COLUMN photo_consent BOOLEAN DEFAULT FALSE;
        END IF;
      END $$;
    `);

    // Migration: Remove old address columns if they exist (cleanup)
    await client.query(`
      DO $$ 
      BEGIN 
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'registrations' AND column_name = 'street'
        ) THEN 
          ALTER TABLE registrations 
            DROP COLUMN IF EXISTS street,
            DROP COLUMN IF EXISTS house_number,
            DROP COLUMN IF EXISTS post_code,
            DROP COLUMN IF EXISTS city,
            DROP COLUMN IF EXISTS country;
        END IF;
      END $$;
    `);

    console.log("Database initialized and migrations completed successfully");
  } finally {
    client.release();
  }
}

export { pool };

