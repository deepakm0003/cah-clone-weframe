import { CollectionAfterChangeHook } from "payload"

// When a product is created or updated in Payload CMS,
// automatically sync it to Medusa.js
export const syncProductToMedusa: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  const medusaUrl = process.env.MEDUSA_URL || "http://localhost:9000"
  const medusaApiKey = process.env.MEDUSA_API_KEY || ""

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-medusa-access-token": medusaApiKey,
    }

    const medusaProduct = {
      title: doc.title,
      handle: doc.slug,
      description: doc.description,
      status: doc.available ? "published" : "draft",
    }

    if (doc.medusaProductId) {
      // Update existing Medusa product
      const res = await fetch(`${medusaUrl}/admin/products/${doc.medusaProductId}`, {
        method: "POST",
        headers,
        body: JSON.stringify(medusaProduct),
      })
      if (!res.ok) console.error("Failed to update Medusa product:", await res.text())
      else console.log(`Synced Payload → Medusa (update) for: ${doc.title}`)
    } else if (operation === "create") {
      // Create new Medusa product
      const res = await fetch(`${medusaUrl}/admin/products`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...medusaProduct,
          options: [{ title: "Default Option" }],
          variants: [
            {
              title: "Default Variant",
              prices: [
                { amount: Math.round(doc.price * 100), currency_code: (doc.currency || "eur").toLowerCase() },
              ],
            },
          ],
        }),
      })
      if (!res.ok) {
        console.error("Failed to create Medusa product:", await res.text())
      } else {
        const created = await res.json()
        console.log(`Synced Payload → Medusa (create) for: ${doc.title}`)
        // Return updated doc with medusaProductId to auto-save
        return { ...doc, medusaProductId: created.product?.id }
      }
    }
  } catch (err) {
    console.error("Payload → Medusa sync error:", err)
  }

  return doc
}
