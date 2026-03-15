const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_VzlXdAbJ0o4p@ep-patient-sky-adof7f83-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function findApiKey() {
  try {
    await client.connect();
    console.log('Connected to database.');
    const res = await client.query('SELECT * FROM api_key WHERE type = \'secret\' LIMIT 1');
    if (res.rows.length > 0) {
      console.log('Found API Key:');
      console.log(JSON.stringify(res.rows[0], null, 2));
    } else {
      console.log('No secret API keys found.');
    }
    await client.end();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

findApiKey();
