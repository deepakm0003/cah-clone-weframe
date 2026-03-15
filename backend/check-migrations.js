const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_VzlXdAbJ0o4p@ep-patient-sky-adof7f83-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function checkMigrations() {
  try {
    await client.connect();
    // In Medusa v2, migrations are tracked per module or in a central table
    // Let's look for tables ending in _migration
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%migration%'");
    console.log('Migration tables:', res.rows.map(r => r.table_name).join(', '));
    
    for (const table of res.rows) {
      const data = await client.query(`SELECT * FROM ${table.table_name} LIMIT 5`);
      console.log(`Contents of ${table.table_name}:`, JSON.stringify(data.rows, null, 2));
    }
    
    await client.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkMigrations();
