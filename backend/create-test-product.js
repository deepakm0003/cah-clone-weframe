const fetch = require('node-fetch');

const payloadUrl = 'http://localhost:3000';
const payloadSecret = 'cah-super-secret-payload-key-2026';

async function createTestProduct() {
  console.log('Creating test product in Payload CMS...');
  
  try {
    // Note: Since node-fetch isn't available in root, I'll use common fetch if Node 18+
    const res = await fetch(`${payloadUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${payloadSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Sync Test Product',
        slug: 'sync-test-product',
        description: 'A product to test Payload -> Medusa sync',
        price: 10,
        currency: 'EUR',
        available: true,
        // mainImage is required in the schema, but let's see if we can bypass or if it needs an ID
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log('Product created successfully in Payload:', data.doc.id);
    } else {
      console.error('Failed to create product:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createTestProduct();
