import { IProductModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
// Seed test products matching the Cards Against Humanity catalog
export default async function seed({ container }: any) {
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)

  console.log("Seeding products...")

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
    // Check if product already exists
    const existing = await productService.listProducts({ handle: [product.handle] })
    if (existing.length > 0) {
      console.log(`Product "${product.title}" already exists, skipping.`)
      continue
    }

    await productService.createProducts(product)
    console.log(`Created product: ${product.title}`)
  }

  console.log("Seeding complete!")
}
