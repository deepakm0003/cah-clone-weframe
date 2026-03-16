import { IProductModuleService, IRegionModuleService, ISalesChannelModuleService, IApiKeyModuleService } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
// @ts-ignore – link types may vary
import type { RemoteLink } from "@medusajs/framework/types"

export default async function seed({ container }: any) {
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)
  const regionService: IRegionModuleService = container.resolve(Modules.REGION)
  const salesChannelService: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const apiKeyService: IApiKeyModuleService = container.resolve(Modules.API_KEY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  // ── 1. Region ────────────────────────────────────────────────
  let region: any
  const existingRegions = await regionService.listRegions({ name: "Europe" })
  if (existingRegions.length > 0) {
    region = existingRegions[0]
    console.log(`Region "Europe" already exists (${region.id}), skipping.`)
  } else {
    region = await regionService.createRegions({
      name: "Europe",
      currency_code: "eur",
      countries: ["de", "fr", "nl", "ie", "gb"],
    })
    console.log(`Created region: Europe (${region.id})`)
  }

  // ── 2. Sales Channel ─────────────────────────────────────────
  let salesChannel: any
  const existingChannels = await salesChannelService.listSalesChannels({ name: "Default Sales Channel" })
  if (existingChannels.length > 0) {
    salesChannel = existingChannels[0]
    console.log(`Sales channel already exists (${salesChannel.id}), skipping.`)
  } else {
    salesChannel = await salesChannelService.createSalesChannels({
      name: "Default Sales Channel",
      description: "Default storefront sales channel",
      is_disabled: false,
    })
    console.log(`Created sales channel: ${salesChannel.id}`)
  }

  // ── 3. Publishable API Key ───────────────────────────────────
  let pubKey: any
  const existingKeys = await apiKeyService.listApiKeys({ title: "Frontend Storefront Key" })
  if (existingKeys.length > 0) {
    pubKey = existingKeys[0]
    console.log(`Publishable key already exists: ${pubKey.token}`)
  } else {
    pubKey = await apiKeyService.createApiKeys({
      title: "Frontend Storefront Key",
      type: "publishable",
      created_by: "system",
    })
    console.log(`Created publishable key: ${pubKey.token}`)
  }

  // Link API key ↔ sales channel
  try {
    await link.create({
      [Modules.API_KEY]: { publishable_key_id: pubKey.id },
      [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
    })
    console.log("Linked publishable key to sales channel.")
  } catch (e: any) {
    if (e.message?.includes("already exists") || e.message?.includes("duplicate")) {
      console.log("Link already exists, skipping.")
    } else {
      console.log("Link may already exist, continuing:", e.message?.substring(0, 80))
    }
  }

  // ── 4. Products ──────────────────────────────────────────────
  const products = [
    {
      title: "More Cards Against Humanity",
      handle: "more-cah",
      description: "More Cards Against Humanity comes with 600 expansion cards that instantly double the replayability and girth of your deck.",
      status: "published" as const,
      options: [{ title: "Default Option", values: ["Default Value"] }],
      variants: [
        {
          title: "Default Variant",
          sku: "MORE-CAH-001",
          prices: [{ amount: 2900, currency_code: "eur" }],
          options: { "Default Option": "Default Value" },
        },
      ],
    },
    {
      title: "Tales Vol. 1",
      handle: "tales-vol-1",
      description: "A book of fill-in-the-blank stories to play with your CAH cards.",
      status: "published" as const,
      options: [{ title: "Default Option", values: ["Default Value"] }],
      variants: [
        {
          title: "Default Variant",
          sku: "TALES-VOL1-001",
          prices: [{ amount: 1999, currency_code: "eur" }],
          options: { "Default Option": "Default Value" },
        },
      ],
    },
    {
      title: "Shit List",
      handle: "shit-list",
      description: "A fresh way to play CAH where YOU write the answers, plus 80 black cards.",
      status: "published" as const,
      options: [{ title: "Default Option", values: ["Default Value"] }],
      variants: [
        {
          title: "Default Variant",
          sku: "SHIT-LIST-001",
          prices: [{ amount: 2299, currency_code: "eur" }],
          options: { "Default Option": "Default Value" },
        },
      ],
    },
    {
      title: "Twists Bundle",
      handle: "twists-bundle",
      description: "It's like playing for the first time again, four more times.",
      status: "published" as const,
      options: [{ title: "Default Option", values: ["Default Value"] }],
      variants: [
        {
          title: "Default Variant",
          sku: "TWISTS-BUNDLE-001",
          prices: [{ amount: 4999, currency_code: "eur" }],
          options: { "Default Option": "Default Value" },
        },
      ],
    },
  ]

  for (const product of products) {
    const existing = await productService.listProducts({ handle: [product.handle] })
    if (existing.length > 0) {
      console.log(`Product "${product.title}" already exists, skipping.`)
      // Link existing product to sales channel
      try {
        await link.create({
          [Modules.PRODUCT]: { product_id: existing[0].id },
          [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
        })
      } catch { /* ignore if already linked */ }
      continue
    }

    const created = await productService.createProducts(product)
    console.log(`Created product: ${product.title}`)

    // Link product to sales channel
    try {
      await link.create({
        [Modules.PRODUCT]: { product_id: created.id },
        [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
      })
    } catch { /* ignore if already linked */ }
  }

  console.log("\n═══════════════════════════════════════")
  console.log("  PUBLISHABLE API KEY: " + pubKey.token)
  console.log("═══════════════════════════════════════")
  console.log("Add to your frontend .env.local:")
  console.log(`  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${pubKey.token}`)
  console.log("\nSeeding complete!")
}
