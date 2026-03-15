const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_VzlXdAbJ0o4p@ep-patient-sky-adof7f83-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function checkTables() {
  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', res.rows.map(r => r.table_name).join(', '));
    await client.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkTables();
