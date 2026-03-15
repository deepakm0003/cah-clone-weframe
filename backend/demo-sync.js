const { Client } = require('pg');

const medusaUrl = 'http://localhost:9000';
const payloadUrl = 'http://localhost:3000';
const payloadSecret = 'cah-super-secret-payload-key-2026';
const medusaApiKey = 'sk_medusa_cah_sync_token_2026';

async function demoSync() {
  console.log('--- Starting Payload -> Medusa Sync Demo ---');

  try {
    // 1. Get a product from Payload
    console.log('\n1. Fetching products from Payload CMS...');
    const payloadRes = await fetch(`${payloadUrl}/api/products`, {
      headers: { 'Authorization': `API-Key ${payloadSecret}` }
    });
    const payloadData = await payloadRes.json();
    
    if (!payloadData.docs || payloadData.docs.length === 0) {
      console.log('No products found in Payload. Please create one first.');
      return;
    }

    const product = payloadData.docs[0];
    const newTitle = `Demo Title ${Math.floor(Math.random() * 1000)}`;
    console.log(`Original Payload Title: ${product.title}`);
    console.log(`Target New Title: ${newTitle}`);

    // 2. Update product in Payload
    console.log('\n2. Updating product in Payload CMS...');
    const updateRes = await fetch(`${payloadUrl}/api/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `API-Key ${payloadSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle })
    });

    if (updateRes.ok) {
        console.log('Payload update successful! Waiting for sync (5s)...');
        await new Promise(resolve => setTimeout(resolve, 5000));
    } else {
        console.error('Payload update failed:', await updateRes.text());
        return;
    }

    // 3. Verify in Medusa
    console.log('\n3. Verifying sync in Medusa.js...');
    const medusaRes = await fetch(`${medusaUrl}/admin/products`, {
      headers: { 'x-medusa-access-token': medusaApiKey }
    });
    const medusaData = await medusaRes.json();
    
    const syncedProduct = medusaData.products.find(p => p.handle === product.slug);
    if (syncedProduct) {
      console.log(`Medusa Product Title: ${syncedProduct.title}`);
      if (syncedProduct.title === newTitle) {
        console.log('\n✅ SUCCESS: Payload -> Medusa sync verified!');
      } else {
        console.log('\n❌ FAILURE: Titles do not match in Medusa.');
      }
    } else {
      console.log(`\n❌ FAILURE: Product with handle "${product.slug}" not found in Medusa.`);
    }

  } catch (err) {
    console.error('\nError during demo:', err.message);
  }
}

demoSync();
