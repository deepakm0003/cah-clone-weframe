import pkg from 'pg';
const { Pool } = pkg;

const connectionString = 'postgresql://neondb_owner:npg_VzlXdAbJ0o4p@ep-patient-sky-adof7f83-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

console.log('Testing connection to:', connectionString.replace(/:[^:@]+@/, ':***@'));

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to Postgres!');
    
    // Check if tables exist
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    
    console.log('Tables found:', res.rows.map(r => r.table_name));
    
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
