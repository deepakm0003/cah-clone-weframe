import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// When a product updates in Medusa, sync changes back to Payload CMS
export default async function productUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const payloadUrl = process.env.PAYLOAD_URL || "http://localhost:3001"
  const payloadSecret = process.env.PAYLOAD_SECRET || ""

  try {
    const productService = container.resolve("productModuleService") as any
    const [product] = await productService.listProducts({ id: [data.id] })

    if (!product) return

    // Sync to Payload CMS via REST API
    await fetch(`${payloadUrl}/api/products?where[medusaProductId][equals]=${data.id}`, {
      method: "GET",
      headers: {
        Authorization: `API-Key ${payloadSecret}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(async (existing: any) => {
        const payloadData = {
          medusaProductId: data.id,
        }

        if (existing.docs?.length > 0) {
          // Update existing Payload product
          await fetch(`${payloadUrl}/api/products/${existing.docs[0].id}`, {
            method: "PATCH",
            headers: {
              Authorization: `API-Key ${payloadSecret}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadData),
          })
          console.log(`Synced Medusa product ${data.id} → Payload (update)`)
        }
      })
  } catch (err) {
    console.error("Error syncing Medusa → Payload:", err)
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}
