const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: './.env' });
const crypto = require('crypto');

async function run() {
  console.log("Connecting to database using Neon HTTP driver...");
  
  const sql = neon(process.env.DATABASE_URL);

  try {
    // 1. Check if we already have a publishable key
    let res = await sql("SELECT id, token FROM api_key WHERE type = 'publishable' LIMIT 1");
    let pubKeyToken;
    let pubKeyId;

    if (res.length === 0) {
      console.log("No publishable key found. Creating one...");
      pubKeyToken = "pk_" + crypto.randomBytes(16).toString('hex');
      pubKeyId = "apk_" + crypto.randomBytes(8).toString('hex');
      
      await sql(`
        INSERT INTO api_key (id, title, type, token, created_by, created_at, updated_at) 
        VALUES ($1, 'Frontend Key', 'publishable', $2, 'system', now(), now())
      `, [pubKeyId, pubKeyToken]);
      console.log("Created publishable key:", pubKeyToken);
    } else {
      pubKeyToken = res[0].token;
      pubKeyId = res[0].id;
      console.log("Existing publishable key found:", pubKeyToken);
    }

    // 2. Ensure Sales Channel exists (Store API requires a Sales Channel with ID)
    res = await sql("SELECT id FROM sales_channel WHERE name = 'Default Sales Channel' LIMIT 1");
    let scId;
    if (res.length === 0) {
      scId = "sc_" + crypto.randomBytes(8).toString('hex');
      await sql(`
        INSERT INTO sales_channel (id, name, description, is_disabled, created_at, updated_at)
        VALUES ($1, 'Default Sales Channel', 'Storefront sales channel', false, now(), now())
      `, [scId]);
      console.log("Created Sales Channel:", scId);
    } else {
      scId = res[0].id;
      console.log("Existing Sales Channel:", scId);
    }

    // 3. Link them using the Medusa v2 remote link table
    try {
      await sql(`
        INSERT INTO api_key_sales_channel (id, api_key_id, sales_channel_id, created_at, updated_at)
        VALUES ($1, $2, $3, now(), now())
        ON CONFLICT DO NOTHING
      `, ["aksc_" + crypto.randomBytes(8).toString('hex'), pubKeyId, scId]);
      console.log("Linked API Key and Sales Channel!");
    } catch (e) {
      console.log("Could not link directly via api_key_sales_channel, moving on", e.message);
    }

    console.log("\n==================================");
    console.log("PUBLISHABLE API KEY:", pubKeyToken);
    console.log("==================================");

  } catch (err) {
    console.error("Error:", err);
  }
}

run();
