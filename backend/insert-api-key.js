const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_VzlXdAbJ0o4p@ep-patient-sky-adof7f83-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function insertApiKey() {
  try {
    await client.connect();
    console.log('Connected to database.');
    
    // Check columns
    const cols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'api_key'");
    console.log('Columns:', cols.rows.map(r => r.column_name).join(', '));
    
    const token = 'sk_medusa_cah_sync_token_2026'; // Dummy token
    const id = 'api_key_01J_DUMMY_ID';
    
    // Insert a dummy secret key if not exists
    await client.query(`
      INSERT INTO api_key (id, token, salt, redacted, title, type, created_at, updated_at, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)
      ON CONFLICT (id) DO NOTHING
    `, [id, token, 'salt', 'sk_med...', 'Payload Sync', 'secret', 'system']);
    
    console.log('Inserted API key successfully (if not exists).');
    await client.end();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

insertApiKey();
