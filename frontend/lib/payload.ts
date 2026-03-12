// lib/payload.ts
// Typed Payload CMS API client for the frontend

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CMSProduct {
  id: string
  title: string
  slug: string
  description: string
  bullets: { text: string }[]
  price: number
  currency: string
  mainImage: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  thumbnailImage?: {
    url: string
    alt?: string
  }
  isNew: boolean
  available: boolean
  medusaProductId?: string
  relatedProducts?: CMSProduct[]
}

export interface LinkItem {
  label: string
  href: string
}

export interface CMSFooter {
  shopLinks: LinkItem[]
  infoLinks: LinkItem[]
  socialLinks: LinkItem[]
  legalLinks: LinkItem[]
  copyrightText: string
  emailSignupText: string
}

export interface CMSHomepage {
  heroTitle: string
  heroTagline: string
  heroDescription: string
  heroCta: {
    buyLabel: string
    buyLink: string
    stealLabel: string
    stealLink: string
  }
  featuredProducts?: CMSProduct[]
  emailSignupHeading: string
}

export interface CMSFAQ {
  id: string
  question: string
  answer: string
  order: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function fetchPayload<T>(path: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}/api/${path}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds, revalidate in background
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Payload CMS fetch failed: ${res.status} ${path}`)
  }

  return res.json()
}

// ─── Product API ──────────────────────────────────────────────────────────────

export async function getProduct(slug: string): Promise<CMSProduct | null> {
  try {
    const data = await fetchPayload<{ docs: CMSProduct[] }>(
      `products?where[slug][equals]=${slug}&depth=2`
    )
    return data.docs[0] || null
  } catch (err) {
    console.error('Failed to fetch product from CMS:', err)
    return null
  }
}

export async function getAllProducts(): Promise<CMSProduct[]> {
  try {
    const data = await fetchPayload<{ docs: CMSProduct[] }>('products?limit=50&depth=1')
    return data.docs
  } catch (err) {
    console.error('Failed to fetch products from CMS:', err)
    return []
  }
}

// ─── Homepage Global ──────────────────────────────────────────────────────────

export async function getHomepage(): Promise<CMSHomepage | null> {
  try {
    return await fetchPayload<CMSHomepage>('globals/homepage?depth=2')
  } catch (err) {
    console.error('Failed to fetch homepage from CMS:', err)
    return null
  }
}

// ─── Footer Global ────────────────────────────────────────────────────────────

export async function getFooter(): Promise<CMSFooter | null> {
  try {
    return await fetchPayload<CMSFooter>('globals/footer')
  } catch (err) {
    console.error('Failed to fetch footer from CMS:', err)
    return null
  }
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getFAQs(): Promise<CMSFAQ[]> {
  try {
    const data = await fetchPayload<{ docs: CMSFAQ[] }>('faqs?sort=order&limit=50')
    return data.docs
  } catch (err) {
    console.error('Failed to fetch FAQs from CMS:', err)
    return []
  }
}
